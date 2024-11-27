import { MdGroup, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getChannelInfo } from '@/api/channel.api';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { guestEntity, pathLocationEntity } from '@/api/dto/channel.dto';
import { Dropdown } from '../common/dropdown/Dropdown';

interface IContentProps {
  title: string;
  person: number;
  link: string;
  time: string;
  channelId: string;
}

/**
 * `Content` 컴포넌트는 경로의 이름, 소요 시간, 인원 수를 표시합니다.
 *
 * @param {IContentProps} props - 제목, 시간, 인원, 링크 등의 속성
 * @returns {JSX.Element} - 경로 정보를 렌더링합니다.
 *
 * @remarks
 * - `person` 속성에 인원이 0명 초과인 경우 아이콘과 함께 표시됩니다.
 * - 링크를 클릭하면 해당 경로로 이동합니다.
 *
 * @example
 * ```tsx
 * <Content
 *   title="아들네 집으로"
 *   time="0시간 30분"
 *   person=2
 *   link="/test"
 * />
 * ```
 */

export const Content = (props: IContentProps) => {
  const formattedDate = new Date(props.time).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = new Date(props.time).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const navigate = useNavigate();
  const { setUsers } = useContext(UserContext);

  const updateUsers = (guests: guestEntity[]) => {
    const updatedUsers = guests.map((guest, index) => ({
      id: index + 1,
      name: guest.name ?? `사용자${index + 1}`,
      start_location: {
        title: guest.start_location?.title ?? '', // 기본 제목
        lat: guest.start_location?.lat ?? 0,
        lng: guest.start_location?.lng ?? 0,
      },
      end_location: {
        title: guest.end_location?.title ?? '',
        lat: guest.end_location?.lat ?? 0,
        lng: guest.end_location?.lng ?? 0,
      },
      path:
        guest.path?.map((point: pathLocationEntity) => ({
          lat: point.lat ?? 0,
          lng: point.lng ?? 0,
        })) ?? [],
      marker_style: {
        color: guest.marker_style?.color ?? '#000000',
      },
    }));

    setUsers(updatedUsers);
    console.log('Users updated:', updatedUsers);
  };

  const getUpdateChannelInfo = async () => {
    try {
      const channelInfo = await getChannelInfo(props.channelId);
      console.log('Channel Info:', channelInfo);
      if (channelInfo.data?.guests) {
        updateUsers(channelInfo.data?.guests);
      }
      // 이후 필요한 작업 수행
      // 예: 가져온 데이터를 UI에 반영하거나 상태 관리 스토어에 저장
    } catch (error) {
      console.error('Failed to get channel info:', error);
    }
  };

  const handleUpdate = () => {
    getUpdateChannelInfo();
    navigate('/add-channel/');
  };

  return (
    <div className="relative flex w-full flex-row items-center justify-between px-4 py-5">
      <div
        onClick={() => {
          navigate(props.link);
        }}
      >
        <header className="border-gray-200 pb-1 text-lg">{props.title}</header>
        <section className="flex items-center text-sm leading-5 text-gray-500">
          <time className="mr-4">
            {formattedDate} {formattedTime}
          </time>
          {props.person > 0 && (
            <>
              <MdGroup className="mr-2 h-5 w-5" aria-label="인원수 아이콘" />
              <span>{props.person}명</span>
            </>
          )}
        </section>
      </div>
      <div className="relative">
        <Dropdown>
          <Dropdown.Trigger>
            <MdMoreVert className="h-6 w-6" />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item className="flex items-start text-base" onClick={handleUpdate}>
              수정하기
            </Dropdown.Item>
            <Dropdown.Item className="flex items-start text-base">삭제하기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* {isMenuOpen && (드롭다운 메뉴)} */}
      </div>
    </div>
  );
};
