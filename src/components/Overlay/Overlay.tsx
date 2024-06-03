import React from 'react';

interface IOverlayProps {
  onClose: () => void;
  children: JSX.Element;
}

const Overlay: React.FC<IOverlayProps> = ({ onClose, children }) => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-center items-center z-1000 fixed top-0 left-0 w-screen h-screen bg-overlay"
    >
      {children}
    </div>
  );
};

export default Overlay;
