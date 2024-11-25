import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import classNames from 'classnames';

interface IDropdownContainerProps {
  items: string[];
}

export const HeaderDropdown = (props: IDropdownContainerProps) => {
  // TODO: 하드코딩된 자료 말고 마커 색상 가져오기
  const textMarkerUser = [
    'text-marker-user1',
    'text-marker-user2',
    'text-marker-user3',
    'text-marker-user4',
    'text-marker-user5',
  ];

  const DropdownItems = () => {
    const Items = props.items.map((e, i) => {
      return (
        <DropdownItem key={e}>
          {e}
          <MdLocationOn className={classNames(`h-5 w-5 fill-current ${textMarkerUser[i]}`)} />
        </DropdownItem>
      );
    });

    if (Items.length > 1) {
      Items.push(
        <DropdownItem key="showall" className="text-gray-400">
          모두 보기
        </DropdownItem>,
      );
    }

    return Items;
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <MdMenu className="h-6 w-6" />
        </Dropdown.Trigger>
        <Dropdown.Menu>{DropdownItems()}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
