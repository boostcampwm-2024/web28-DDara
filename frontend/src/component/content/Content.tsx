import React from 'react';
import { MdGroup, MdMoreVert } from 'react-icons/md';

interface IContentProps {
  title: string;
  time: string;
  person: number;
  link: string;
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
  return (
    <a
      href={props.link}
      className="relative flex w-full flex-row items-center justify-between px-4 py-5"
    >
      <div>
        <header className="border-gray-200 pb-1 text-lg">{props.title}</header>
        <section className="flex items-center text-sm leading-5 text-gray-500">
          <time className="mr-4">시간</time>
          <span className="mr-6">{props.time}</span>
          {props.person > 0 && (
            <>
              <MdGroup className="mr-2 h-5 w-5" aria-label="인원수 아이콘" />
              <span>{props.person}명</span>
            </>
          )}
        </section>
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
