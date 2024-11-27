import { useContext } from 'react';
import { ToolTypeContext } from '@/context/ToolTypeContext';
import { ButtonStateDescriptions } from './constant/DescriptionConst';

export const ToolDescription = () => {
  const { toolType } = useContext(ToolTypeContext);
  const description = ButtonStateDescriptions[toolType];

  return (
    // 조건부 렌더링: description이 빈 문자열이 아니면 렌더링
    description ? (
      <div className="bg-blueGray-200 absolute bottom-6 ml-6 h-9 w-64 rounded-lg bg-opacity-[0.5]">
        <p className="flex h-full w-full select-none items-center justify-center whitespace-pre-line text-center text-xs text-white text-opacity-100">
          {description}
        </p>
      </div>
    ) : null
  );
};
