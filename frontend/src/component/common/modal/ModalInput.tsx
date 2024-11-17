interface IModalInputProps {
  /** 입력 필드의 제목입니다. */
  title: string;
  /** 입력 필드의 이름 속성입니다. */
  name: string;
  /** 입력 필드의 placeholder 텍스트입니다. */
  placeholder: string;
  /** 입력 필드의 현재 값입니다. */
  value: string;
  /** 입력 필드 값이 변경될 때 호출되는 함수입니다. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalInput = (props: IModalInputProps) => (
  <div className="flex flex-row items-center justify-between py-2">
    <p className="font-medium">{props.title}</p>
    <input
      className="border-grayscale-75 text-grayscale-50 h-[32px] w-[250px] rounded-md border px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);
