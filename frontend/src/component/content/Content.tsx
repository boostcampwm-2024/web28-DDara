import { MdGroup, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getChannelInfo } from '@/api/channel.api';
import { useContext } from 'react';
import { ChannelContext } from '@/context/ChannelContext';
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
  const { channelInfo, setChannelInfo } = useContext(ChannelContext);

  const getUpdateChannelInfo = async () => {
    try {
      const channel = await getChannelInfo(props.channelId);
      if (channel?.data) {
        setChannelInfo(channel.data);
      }
    } catch (error) {
      console.error('Failed to get channel info:', error);
    }
  };
  const goToChannelInfoPage = () => {
    if (channelInfo?.id) {
      navigate(`/channelInfo/${channelInfo.id}`);
    }
  };

  const handleUpdate = () => {
    getUpdateChannelInfo();
    goToChannelInfoPage();
  };

  return (
    <div
      className="relative flex w-full flex-row items-center justify-between px-4 py-5"
      onClick={() => {
        navigate(props.link);
      }}
    >
      <div>
        <header className="border-gray-200 pb-1 text-start text-lg">{props.title}</header>
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
      <div
        className="relative"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Dropdown>
          <Dropdown.Trigger>
            <MdMoreVert className="h-6 w-6" />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item className="flex items-start text-base" onClick={handleUpdate}>
              공유하기
            </Dropdown.Item>
            <Dropdown.Item className="flex items-start text-base">삭제하기</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
