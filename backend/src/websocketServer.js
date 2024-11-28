import { WebSocketServer } from 'ws';

const activeConnections = {}; // token별로 연결을 관리하기 위한 객체
const channelData = {};

export const initializeWebSocketServer = server => {
  const wss = new WebSocketServer({
    server,
    verifyClient: (info, done) => {
      const { origin } = info;

      if (origin === 'http://localhost:5173' || origin === 'https://ddara.kro.kr') {
        done(true);
      } else {
        done(false, 403, 'Forbidden: Origin not allowed');
      }
    },
  });

  wss.on('error', err => {
    console.error('WebSocket Server Error:', err);
  });

  wss.on('connection', (ws, req) => {
    // URL에서 token 추출
    // TODO: 프론트 라우터 및 token 설정 완료 후 테스트
    const params = new URLSearchParams(req.url.split('?')[1]);
    const token = params.get('token');
    const channelId = params.get('channelId');
    const role = params.get('role');
    const guestId = params.get('guestId');

    if (!token) {
      ws.close(4001, 'Token is required');
      return;
    }

    // 동일한 token으로 이미 연결된 클라이언트가 있으면 이전 연결을 강제로 종료
    if (activeConnections[token]) {
      activeConnections[token].close(4000, 'Duplicate connection');
    }

    // 새로운 연결을 활성화된 연결 목록에 저장
    activeConnections[token] = ws;

    if (!channelData[channelId]) {
      channelData[channelId] = { hosts: {}, guests: {} };
    }

    if (role === 'host') {
      channelData[channelId].hosts[token] = { ws };
    } else if (role === 'guest') {
      channelData[channelId].guests[token] = { ws, guestId };
    }

    console.log(`Client connected with token: ${token}`);

    // 새 클라이언트에게 기존 클라이언트의 위치 전송
    if (role === 'host') {
      const existingGuests = Object.values(channelData[channelId].guests).map(client => ({
        token: Object.keys(channelData[channelId].guests).find(
          key => channelData[channelId].guests[key].ws === client.ws,
        ),
        guestId: client.guestId,
        location: client.location || {},
      }));
      ws.send(JSON.stringify({ type: 'init', clients: existingGuests }));
    }

    // 클라이언트로부터 메시지 받았을 때의 이벤트 처리
    ws.on('message', message => {
      try {
        const data = JSON.parse(message);
        if (data.type === 'location') {
          const locationData = { ...data.location, token, guestId };

          // Guest 위치 업데이트 및 Host들에게 전달
          if (role === 'guest') {
            channelData[channelId].guests[token].location = data.location;
            Object.values(channelData[channelId].hosts).forEach(host =>
              host.ws.send(JSON.stringify({ type: 'location', ...locationData })),
            );
          }
        }
      } catch (err) {
        console.error('Invalid message format:', err);
      }
    });

    // 클라이언트 연결 종료 시
    ws.on('close', () => {
      // 연결 종료 시 클라이언트 제거
      delete activeConnections[token];
      if (channelData[channelId]) {
        delete channelData[channelId].hosts[token];
        delete channelData[channelId].guests[token];
        if (
          Object.keys(channelData[channelId].hosts).length === 0 &&
          Object.keys(channelData[channelId].guests).length === 0
        ) {
          delete channelData[channelId]; // 채널 데이터 삭제
        }
      }
    });
  });

  console.log('WebSocket server initialized.');
};
