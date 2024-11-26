import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import classNames from 'classnames';

interface IDropdownContainerProps {
  items: string[];
}

export const HeaderDropdown = (props: IDropdownContainerProps) => {
  // Tailwind의 동적 클래스 네이밍 할당을 위한 변수
  const textMarkerUser = [
    'text-marker-user1',
    'text-marker-user2',
    'text-marker-user3',
    'text-marker-user4',
    'text-marker-user5',
  ];

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <MdMenu className="h-6 w-6" />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {props.items.map((e, i) => {
            return (
              <DropdownItem key={e}>
                {e}
                <MdLocationOn className={classNames(`h-5 w-5 fill-current ${textMarkerUser[i]}`)} />
                {/* 아이콘 색 변경 로직 찾기, 현재는 아이콘색이 반영이 안됨 수정할 사 */}
              </DropdownItem>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
