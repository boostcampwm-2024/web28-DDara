import React from 'react';
import { MdGroup, MdMoreVert } from 'react-icons/md';

interface IContentProps {
  title: string;
  time: string;
  person?: string;
  link: string;
}

/**
 * `Content` 컴포넌트는 경로의 제목, 시간, 인원 수를 표시하며, 드롭다운 메뉴를 통해 수정 및 삭제 기능을 제공합니다.
 *
 * @param title 제목
 * @param time 시간
 * @param person 인원 수
 * @returns JSX.Element
 */

export const Content = (props: IContentProps) => {
  return (
    <a
      href={props.link}
      className="relative flex w-full flex-row items-center justify-between px-4 py-5"
    >
      <div>
        <div className="border-b border-gray-200 pb-1 text-lg">{props.title}</div>
        <div className="flex items-center text-sm leading-5 text-gray-500">
          <span className="mr-4">시간</span>
          <span className="mr-6">{props.time}</span>
          {props.person && (
            <>
              <MdGroup className="mr-2 h-5 w-5" />
              <span>{props.person}</span>
            </>
          )}
        </div>
      </div>
      <div className="relative">
        <button type="button" className="p-2">
          <MdMoreVert className="h-6 w-6" />
        </button>
        {/* {isMenuOpen && (드롭다운 메뉴)} */}
      </div>
    </a>
  );
};
