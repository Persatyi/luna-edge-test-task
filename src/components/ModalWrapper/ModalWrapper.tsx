import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Overlay from '../Overlay';

interface IModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const ModalWrapper: React.FC<IModalWrapperProps> = ({ open, onClose, children }) => {
  const modalRef = useRef(document.getElementById('modal-root'));

  useEffect(() => {
    const onEscPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEscPress);

    return () => window.removeEventListener('keydown', onEscPress);
  }, [onClose]);

  return open
    ? createPortal(<Overlay onClose={onClose}>{children}</Overlay>, modalRef.current!)
    : null;
};

export default ModalWrapper;
