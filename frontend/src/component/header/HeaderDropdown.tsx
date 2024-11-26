import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { IGuestData } from '@/types/channel.types.ts';

interface IDropdownContainerProps {
  items: IGuestData[];
}

export const HeaderDropdown = (props: IDropdownContainerProps) => {
  const DropdownItems = () => {
    const Items = props.items.map(guestData => {
      return (
        <DropdownItem key={guestData.id} path={`../guest/${guestData.id}`}>
          <span>{guestData.name} 위치</span>
          <MdLocationOn className="h-5 w-5 fill-current" color={guestData.markerStyle.color} />
        </DropdownItem>
      );
    });

    if (Items.length > 1) {
      Items.push(
        <DropdownItem key="showall" path="host">
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
