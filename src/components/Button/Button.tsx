import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  className?: string;
  type?: 'button' | 'link' | 'submit' | 'reset' | undefined;
  isText?: boolean;
  text?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
  ) => void;
  disabled?: boolean;
  to?: string;
  image?: JSX.Element | null;
  imagePosition?: 'beforeText' | 'afterText';
}

const Button: React.FC<IProps> = ({
  className,
  type = 'button',
  isText = true,
  text,
  onClick,
  disabled = false,
  to = '/',
  image,
  imagePosition,
}) => {
  if (type === 'link') {
    return (
      <Link to={to} onClick={onClick} className={className}>
        {imagePosition === 'beforeText' && image}
        {isText && text}
        {imagePosition === 'afterText' && image}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type as 'button' | 'submit' | 'reset'}
      disabled={disabled}
      onClick={onClick}
    >
      {imagePosition === 'beforeText' && image}
      {isText && text}
      {imagePosition === 'afterText' && image}
    </button>
  );
};

export default Button;
