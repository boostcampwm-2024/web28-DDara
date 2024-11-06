import { ChangeEvent, FocusEvent } from 'react';

export interface IInputBoxProps {
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputBox = ({
  type = 'text',
  value = '',
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  className = '',
}: IInputBoxProps) => (
  <input
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    className={`flex h-10 w-80 px-3 py-2 rounded-sm border border-input  ${className}`}
  />
);
