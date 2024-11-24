import { useContext, useEffect } from 'react';
import { MdFormatListBulleted } from 'react-icons/md';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { useNavigate } from 'react-router-dom';
import { buttonActiveType } from '@/component/layout/enumTypes';
import { FullScreenMap } from '@/component/maps/Canvas.tsx';

// const contentData = [
//   {
//     id: '1',
//     title: '아들네 집으로',
//     time: '0시간 34분',
//     person: 2,
//     link: '/channel/123/guest/456',
//   },
//   {
//     id: '2',
//     title: '손자네 집으로',
//     time: '2시간 32분',
//     person: 0,
//     link: '/channel/123/guest/456',
//   },
//   {
//     id: '3',
//     title: '마을회관으로',
//     time: '0시간 12분',
//     person: 1,
//     link: '/channel/123/guest/456',
//   },
// ];

export const Main = () => {
  const { setFooterTitle, setFooterTransparency, setFooterOnClick, setFooterActive } =
    useContext(FooterContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (lat && lng) {
  //     if (!loadLocalData(AppConfig.KEYS.BROWSER_TOKEN)) {
  //       const token = uuidv4();
  //       saveLocalData(AppConfig.KEYS.BROWSER_TOKEN, token);
  //     }
  //     const token = loadLocalData(AppConfig.KEYS.BROWSER_TOKEN);
  //     const ws = new WebSocket(`${AppConfig.SOCKET_SERVER}/?token=${token}`);
  //
  //     // 초기 위치 전송
  //     ws.onopen = () => {
  //       ws.send(JSON.stringify({ type: 'location', location: { lat, lng } }));
  //     };
  //
  //     ws.onmessage = event => {
  //       const data = JSON.parse(event.data);
  //
  //       if (data.type === 'init') {
  //         // 기존 클라이언트들의 위치 초기화
  //         setOtherLocations(data.clients);
  //       } else if (data.type === 'location' && data.token !== token) {
  //         // 새로 들어온 위치 업데이트
  //         setOtherLocations(prev =>
  //           prev.some(loc => loc.token === data.token)
  //             ? prev.map(loc => (loc.token === data.token ? data : loc))
  //             : [...prev, data],
  //         );
  //       }
  //     };
  //     return () => ws.close();
  //   }
  // }, [lat, lng]);

  const goToAddChannel = () => {
    navigate('/add-channel');
  };
  useEffect(() => {
    setFooterOnClick(goToAddChannel);
    setFooterTitle('+');
    setFooterTransparency(false);
    setFooterActive(buttonActiveType.ACTIVE);
  }, []);
  return (
    <div className="flex h-screen flex-col">
      <header className="absolute left-0 right-0 top-0 z-10 flex p-4">
        <button type="button" className="text-gray-700">
          <MdFormatListBulleted size={24} />
        </button>
      </header>
      <FullScreenMap />

      {/* <main */}
      {/*  className="relative flex-grow" */}
      {/*  style={{ */}
      {/*    height: `calc(100% - ${MIN_HEIGHT * 100}%)`, */}
      {/*  }} */}
      {/* /> */}

      {/* <BottomSheet minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT}> */}
      {/*  {contentData.map(item => ( */}
      {/*    <Fragment key={item.id}> */}
      {/*      <Content title={item.title} time={item.time} person={item.person} link={item.link} /> */}
      {/*      <hr className="my-2" /> */}
      {/*    </Fragment> */}
      {/*  ))} */}
      {/* </BottomSheet> */}
    </div>
  );
};
