import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  className?: string;
  type?: "button" | "link" | "submit" | "reset" | undefined;
  text: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
  ) => void;
  disabled?: boolean;
  to?: string;
}

const Button: React.FC<IProps> = ({
  className,
  type = "button",
  text,
  onClick,
  disabled = false,
  to = "/",
}) => {
  if (type === "link") {
    return (
      <Link to={to} onClick={onClick} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type as "button" | "submit" | "reset"}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
