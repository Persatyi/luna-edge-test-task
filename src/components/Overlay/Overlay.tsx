import React from 'react';

interface IOverlayProps {
  onClose: () => void;
  children: JSX.Element;
}

const Overlay: React.FC<IOverlayProps> = ({ onClose, children }) => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default Overlay;
