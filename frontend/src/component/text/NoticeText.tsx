import { MdInfo } from 'react-icons/md';

interface INoticeTextProps {
  children: string;
}

export const NoticeText = (props: INoticeTextProps) => {
  return (
    <div className="flex items-center gap-0.5 pl-2.5 text-xs font-normal text-gray-400">
      <MdInfo className="h-3 w-3 text-black" />
      <span className="align-center flex">{props.children}</span>
    </div>
  );
};
