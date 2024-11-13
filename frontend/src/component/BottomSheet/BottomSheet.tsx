import React from 'react';
import { useBottomSheet } from '@/hooks/useBottomSheet';

interface IBottomSheetProps {
  minHeight: number;
  maxHeight: number;
  children: React.ReactNode;
}

/**
 * `BottomSheet` 컴포넌트는 하단에서 올라오는 시트 형태의 UI를 제공합니다.
 *
 * @param {IBottomSheetProps} props - `children`을 포함한 컴포넌트 속성
 * @param {number} props.minHeight - Bottom Sheet의 최소 높이를 화면 비율로 나타냅니다 (0.0 - 1.0).
 * @param {number} props.maxHeight - Bottom Sheet의 최대 높이를 화면 비율로 나타냅니다 (0.0 - 1.0).
 * @param {ReactNode} props.children - Bottom Sheet 내부에 렌더링할 콘텐츠입니다.
 * @returns {ReactNode} - 하단 시트를 렌더링합니다.
 *
 * @remarks
 * - 드래그 동작을 통해 시트를 열고 닫을 수 있습니다.
 * - `useBottomSheet` 훅을 사용하여 위치 및 드래그 동작을 관리합니다.
 * - `minHeight`는 Bottom Sheet가 닫힌 상태의 높이 비율을 나타냅니다.
 * - `maxHeight`는 Bottom Sheet가 열린 상태의 최대 높이 비율을 나타냅니다.
 *
 * @example
 * ```tsx
 * <BottomSheet minHeight={0.5} maxHeight={0.85}>
 *   <div className="p-4">
 *     <h2>예시 콘텐츠</h2>
 *     <p>BottomSheet의 children</p>
 *   </div>
 * </BottomSheet>
 * ```
 */

export const BottomSheet = (props: IBottomSheetProps) => {
  const { sheet } = useBottomSheet({ minHeight: props.minHeight, maxHeight: props.maxHeight });

  return (
    <div
      ref={sheet}
      className="shadow-dark fixed left-0 right-0 z-[101] flex h-full flex-col rounded-t-lg transition-transform duration-700"
      style={{
        top: `calc(100% - ${props.minHeight * 100}%)`,
        background: '#FEFEFEF2',
      }}
    >
      <div className="flex items-center justify-center pb-1 pt-2">
        <div className="h-1.5 w-12 rounded-full bg-gray-300" />
      </div>
      {props.children}
    </div>
  );
};
