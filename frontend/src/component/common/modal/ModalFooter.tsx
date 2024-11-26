interface IModalFooterProps {
  /** 메인 버튼의 텍스트입니다. */
  text: string;
  /** 메인 버튼 클릭 시 호출되는 함수입니다. */
  onClick?: () => void;
  /** 보조 버튼의 텍스트입니다 (선택 사항) */
  text2?: string;
  /** 보조 버튼 클릭 시 호출되는 함수입니다 (선택 사항) */
  onClick2?: () => void;
}

export const ModalFooter = (props: IModalFooterProps) => (
  <div className="flex w-full flex-row-reverse items-center justify-start gap-5 rounded-lg bg-white py-4 shadow-sm">
    <button
      type="button"
      className="bg-blueGray-600 h-[40px] rounded-lg px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      onClick={props.onClick}
    >
      {props.text}
    </button>
    {props.text2 ? (
      <button type="button" className="text-grayscale-400 text-xs" onClick={props.onClick2}>
        {props.text2}
      </button>
    ) : (
      ''
    )}
  </div>
);
