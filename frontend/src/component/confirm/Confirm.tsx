interface IConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'confirm' | 'alert';
  confirmText?: string;
  cancelText?: string;
}

export const Confirm = (props: IConfirmProps) => {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black bg-opacity-70">
      <div className="absolute left-1/2 top-1/2 z-[6000] mx-auto flex w-[22rem] max-w-md -translate-x-1/2 flex-col items-center justify-center gap-6 rounded-md bg-gray-50 p-6 text-white shadow-lg">
        <div className="text-blueGray-800 whitespace-pre py-2 text-center text-lg font-medium">
          {props.message}
        </div>
        {props.type === 'alert' ? (
          <div className="flex w-full items-center justify-between gap-4">
            <button
              className="bg-blueGray-800 w-full cursor-pointer rounded-md border-none px-2.5 py-2.5 text-sm font-medium text-white"
              onClick={props.onConfirm}
            >
              {props.confirmText || '확인'}
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-4">
            <button
              className="bg-blueGray-800 w-full cursor-pointer rounded-md border-none px-2.5 py-2.5 text-sm font-medium text-white"
              onClick={props.onConfirm}
            >
              {props.confirmText || '확인'}
            </button>
            <button
              className="w-full cursor-pointer rounded-md border-none bg-gray-400 px-2.5 py-2.5 text-sm font-medium text-white"
              onClick={props.onCancel}
            >
              {props.cancelText || '취소'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
