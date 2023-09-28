// Popup.tsx

import React, { ReactNode, useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children:ReactNode
}
const Popup: React.FC<PopupProps> = ({ isOpen, onClose,children }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 flex items-center justify-center z-50 `}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-75 "></div>
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-2/5	">
        <div className="text-right">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {children}
         </div>
    </div>
  );
};

export default Popup;
