import { WebSocketServer } from 'ws';

const activeConnections = {}; // token별로 연결을 관리하기 위한 객체

export const initializeWebSocketServer = server => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    // URL에서 token 추출
    // TODO: 프론트 라우터 및 token 설정 완료 후 테스트
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

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

    console.log(`Client connected with token: ${token}`);

    // 클라이언트로부터 메시지 받았을 때의 이벤트 처리
    ws.on('message', message => {
      try {
        const data = JSON.parse(message); // 위치 데이터 수신
        if (data.latitude && data.longitude) {
          // 브로드캐스트: 모든 클라이언트에게 위치 정보 전달
          Object.values(activeConnections).forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ token, ...data }));
            }
          });
        }
      } catch (err) {
        console.error('Invalid message received:', err);
      }
    });

    // 클라이언트 연결 종료 시
    ws.on('close', (code, reason) => {
      console.log(`Client disconnected with token: ${token}, Code: ${code}, Reason: ${reason}`);
      // 연결이 종료되면 activeConnections에서 해당 token 제거
      delete activeConnections[token];
    });
  });
};
