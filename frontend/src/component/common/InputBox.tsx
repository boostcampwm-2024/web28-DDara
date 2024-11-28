import { ChangeEvent, FocusEvent } from 'react';

export interface IInputBoxProps {
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  readOnly?: boolean;
}

export const InputBox = ({
  type = 'text',
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  value = '',
  className = '',
  readOnly = false, // 기본값은 false로 설정
}: IInputBoxProps) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
    readOnly={readOnly} // 읽기 전용 처리
    className={`border-grayscale-75 placeholder:text-grayscale-50 focus:border-grayscale-400 text-grayscale-400 font-nomal flex h-11 w-full rounded border px-3 text-xs focus:border-2 focus:outline-none ${className}`}
  />
);
