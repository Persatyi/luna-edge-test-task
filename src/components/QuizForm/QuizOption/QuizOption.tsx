import React from 'react';

interface IQuizOption {
  text: string;
  labelClassName?: string;
  inputClassName?: string;
  type: 'checkbox' | 'radio' | 'number';
  value?: string | number;
  placeholder?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuizOption: React.FC<IQuizOption> = ({
  text,
  labelClassName,
  inputClassName,
  type,
  checked,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <label className={labelClassName}>
      {text}
      <input
        placeholder={placeholder}
        className={inputClassName}
        type={type}
        onChange={e => onChange(e)}
        checked={checked}
        value={value}
      />
    </label>
  );
};

export default QuizOption;
