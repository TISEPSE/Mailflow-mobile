import React from 'react';

interface ToastProps {
  message: string | null;
  onUndo?: () => void;
  dark?: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, onUndo, dark = false }) => {
  if (!message) return null;

  return (
    <div className="absolute left-3 right-3 bottom-18 z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border border-white/10 animate-rise"
      style={{
        backgroundColor: dark ? '#2D2F31' : '#1F1F1F',
        color: '#FFFFFF'
      }}
    >
      <span className="text-xs font-medium leading-tight flex-1">
        {message}
      </span>
      {onUndo && (
        <button
          onClick={onUndo}
          className="text-xs font-bold text-blue-400 hover:text-blue-300 active:scale-95 transition-transform px-2 py-1"
        >
          Annuler
        </button>
      )}
    </div>
  );
};
