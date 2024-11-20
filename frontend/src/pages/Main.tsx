import { Fragment } from 'react';
import { getUserLocation } from '@/hooks/getUserLocation';
import { Map } from '@/component/maps/Map';
import { BottomSheet } from '@/component/bottomsheet/BottomSheet';
import { Content } from '@/component/content/Content';
import { MdFormatListBulleted } from 'react-icons/md';

const contentData = [
  {
    id: '1',
    title: '아들네 집으로',
    time: '0시간 34분',
    person: 2,
    link: '/test1',
  },
  {
    id: '2',
    title: '손자네 집으로',
    time: '2시간 32분',
    person: 0,
    link: '/test2',
  },
  {
    id: '3',
    title: '마을회관으로',
    time: '0시간 12분',
    person: 1,
    link: '/test3',
  },
];

export const Main = () => {
  const { lat, lng, error } = getUserLocation();
  const MIN_HEIGHT = 0.03;
  const MAX_HEIGHT = 0.8;

  return (
    <div className="flex h-screen flex-col">
      <header className="absolute left-0 right-0 top-0 z-10 flex p-4">
        <button type="button" className="text-gray-700">
          <MdFormatListBulleted size={24} />
        </button>
      </header>

      <main
        className="relative flex-grow"
        style={{
          height: `calc(100% - ${MIN_HEIGHT * 100}%)`,
        }}
      >
        {lat && lng ? (
          <Map lat={lat} lng={lng} type="naver" />
        ) : (
          <section className="flex h-full items-center justify-center">
            {error ? `Error: ${error}` : 'Loading'}
          </section>
        )}
      </main>

      <BottomSheet minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT}>
        {contentData.map(item => (
          <Fragment key={item.id}>
            <Content title={item.title} time={item.time} person={item.person} link={item.link} />
            <hr className="my-2" />
          </Fragment>
        ))}
      </BottomSheet>
    </div>
  );
};
