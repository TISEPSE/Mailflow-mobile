import React from 'react';
import { Icon } from './Icon';

interface FloatingComposeButtonProps {
  onClick: () => void;
  dark?: boolean;
}

export const FloatingComposeButton: React.FC<FloatingComposeButtonProps> = ({
  onClick,
  dark = false
}) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 bottom-18 z-30 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
      style={{
        backgroundColor: 'var(--accent)',
        color: dark ? '#0B1B33' : '#FFFFFF',
      }}
      aria-label="Rédiger un nouveau message"
    >
      <Icon name="edit" size={20} filled />
      <span className="text-xs font-semibold tracking-tight">Rédiger</span>
    </button>
  );
};
