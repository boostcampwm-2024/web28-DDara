import React from 'react';
import { MdGroup, MdMoreVert } from 'react-icons/md';

interface IContentProps {
  title: string;
  time: string;
  person: number;
  link: string;
}

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
          {props.person > 0 && (
            <>
              <MdGroup className="mr-2 h-5 w-5" />
              <span>{props.person}명</span>
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
