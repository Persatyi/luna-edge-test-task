import React from 'react';

import Button from '../Button';

interface IModalProps {
  message: string;
  cancel: () => void;
  action: () => void;
}

const Modal: React.FC<IModalProps> = ({ message, cancel, action }) => {
  return (
    <div className="relative w-96 min-h-36 bg-white rounded p-12 pb-24">
      <h3 className="font-semibold">{message}</h3>
      <div className="absolute bottom-4 left-16 flex items-center gap-5 justify-center">
        <Button
          className="block rounded bg-green p-2 text-white font-semibold h-6 w-28"
          text="Continue"
          onClick={action}
        />
        <Button
          className="block rounded bg-red p-2 text-white font-semibold h-6 w-28"
          text="Cancel"
          onClick={cancel}
        />
      </div>
    </div>
  );
};

export default Modal;
