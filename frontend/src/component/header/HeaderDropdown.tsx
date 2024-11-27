import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { HeaderDropdownContext } from '@/component/header/HeaderDropdownProvider.tsx';
import { useContext } from 'react';

export const HeaderDropdown = () => {
  const { headerDropdownOption } = useContext(HeaderDropdownContext);

  const DropdownItems = () => {
    const Items = headerDropdownOption.items.map(guestData => {
      return (
        <DropdownItem key={guestData.id}>
          <span>{guestData.name} 보기</span>
          <MdLocationOn className="h-5 w-5 fill-current" color={guestData.markerStyle.color} />
        </DropdownItem>
      );
    });

    if (Items.length > 1) {
      Items.push(<DropdownItem key="showall">모두 보기</DropdownItem>);
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
