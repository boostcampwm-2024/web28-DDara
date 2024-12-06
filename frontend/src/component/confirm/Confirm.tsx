import classNames from 'classnames';

interface IConfirmButtonProps {
  onClick: () => void;
  text: string;
  type: 'confirm' | 'cancel';
}

const ConfirmButton = (props: IConfirmButtonProps) => (
  <button
    className={classNames(
      'w-full cursor-pointer rounded-md border-none px-2.5 py-2.5 text-sm font-medium',
      props.type === 'confirm' && 'bg-blueGray-800 text-white',
      props.type === 'cancel' && 'bg-gray-400 text-white',
    )}
    onClick={props.onClick}
    type="button"
  >
    {props.text}
  </button>
);

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
    <div className="fixed inset-0 z-[8000] flex items-center justify-center bg-black bg-opacity-70">
      <div className="absolute left-1/2 z-[8100] mx-auto my-0 flex w-[22rem] max-w-md -translate-x-1/2 flex-col items-center justify-center gap-6 rounded-md bg-gray-50 p-6 text-white shadow-lg">
        <div className="text-blueGray-800 whitespace-pre py-2 text-center text-lg font-medium">
          {props.message}
        </div>
        {props.type === 'alert' ? (
          <ConfirmButton
            onClick={props.onConfirm}
            text={props.confirmText || '확인'}
            type="confirm"
          />
        ) : (
          <div className="flex w-full items-center justify-between gap-4">
            <ConfirmButton
              onClick={props.onConfirm}
              text={props.confirmText || '확인'}
              type="confirm"
            />
            <ConfirmButton
              onClick={props.onCancel}
              text={props.cancelText || '취소'}
              type="cancel"
            />
          </div>
        )}
      </div>
    </div>
  );
};
