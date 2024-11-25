import { ChangeEvent, FocusEvent } from 'react';

export interface IInputBoxProps {
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

export const InputBox = ({
  type = 'text',
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  value = '',
  className = '',
}: IInputBoxProps) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
    className={`border-grayscale-75 placeholder:text-grayscale-50 focus:border-grayscale-400 text-grayscale-400 flex h-11 w-full rounded border px-3 text-xs focus:border-2 focus:outline-none ${className}`}
  />
);
