import React from 'react';
import { Icon } from './Icon';

interface FloatingComposeButtonProps {
  onClick: () => void;
  isNative?: boolean;
  dark?: boolean;
}

export const FloatingComposeButton: React.FC<FloatingComposeButtonProps> = ({
  onClick,
  isNative = false,
  dark = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`fixed right-4 z-30 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl shadow-xl active:scale-95 transition-all cursor-pointer ${
        isNative ? 'bottom-[calc(4.8rem+env(safe-area-inset-bottom,12px))]' : 'bottom-20'
      }`}
      style={{
        backgroundColor: 'var(--accent)',
        color: dark ? '#0B1B33' : '#FFFFFF',
      }}
      aria-label="Rédiger un nouveau message"
    >
      <Icon name="edit" size={20} filled />
      <span className="text-xs font-bold tracking-tight">Rédiger</span>
    </button>
  );
};
