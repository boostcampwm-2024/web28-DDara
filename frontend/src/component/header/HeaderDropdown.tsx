import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import { HeaderDropdownContext } from '@/component/header/HeaderDropdownProvider.tsx';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

export const HeaderDropdown = () => {
  const [clickedId, setClickedId] = useState<string>('');
  const { headerDropdownOption } = useContext(HeaderDropdownContext);

  useEffect(() => {
    if (headerDropdownOption.items.length === 1) setClickedId(headerDropdownOption.items[0].id);
  }, [headerDropdownOption]);

  const DropdownItems = () => {
    const Items = headerDropdownOption.items.map(guestData => {
      return (
        <DropdownItem
          key={guestData.id}
          onClick={() => {
            headerDropdownOption.onClick(guestData.id);
            setClickedId(guestData.id);
          }}
        >
          <span
            className={classNames({
              'text-marker-user4 font-bold': clickedId === guestData.id,
            })}
          >
            {guestData.name} 보기
          </span>
          <MdLocationOn className="h-5 w-5 fill-current" color={guestData.markerStyle.color} />
        </DropdownItem>
      );
    });

    if (Items.length > 1) {
      Items.push(
        <DropdownItem
          key="showall"
          onClick={() => {
            headerDropdownOption.onClick('');
            setClickedId('');
          }}
        >
          <span
            className={classNames({
              'text-marker-user4 font-bold': clickedId === '',
            })}
          >
            모두 보기
          </span>
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
