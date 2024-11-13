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
          ].map((e, i) => (
            <DropdownItem key={e}>
              {/* 위치 자동으로 채워지게 하는 방법 찾기 */}
              <div className="flex w-28 items-start justify-between">
                {e}
                <MdLocationOn className={classNames('w-5', 'h-5', `color-marker-user${i + 1}`)} />
                {/* 아이콘 색 변경 로직 찾기 + 아이콘 높이 맞추기 */}
              </div>
            </DropdownItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
