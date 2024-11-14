import { Dropdown } from '@/component/common/dropdown/Dropdown.tsx';
import { MdMenu, MdLocationOn } from 'react-icons/md';
import { DropdownItem } from '@/component/common/dropdown/DropdownItem.tsx';
import classNames from 'classnames';

// interface IDropdownContainerProps {}

// TDDO : props로 전달되면 해석되도록 로직 변경 (props:props: IDropdownContainerProps)
export const HeaderDropdown = () => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <MdMenu className="h-6 w-6" />
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {[
            '사용자 1 보기',
            '사용자 2 보기',
            '사용자 3 보기',
            '사용자 4 보기',
            '사용자 5 보기',
          ].map((e, i) => {
            return (
              <DropdownItem key={e}>
                {e}
                <MdLocationOn
                  className={classNames('w-5', 'h-5', `text-marker-user${i + 1}`, 'fill-current')}
                />
                {/* 아이콘 색 변경 로직 찾기, 현재는 아이콘색이 반영이 안됨 수정할 사 */}
              </DropdownItem>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
