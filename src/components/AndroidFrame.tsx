import React, { useState, useEffect } from 'react';

interface AndroidFrameProps {
  children: React.ReactNode;
  dark?: boolean;
  enabled?: boolean;
  onToggleFrame?: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  dark = false,
  enabled = true,
  onToggleFrame
}) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const textColor = dark ? '#ffffff' : '#1f1f1f';

  if (!enabled) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col bg-[var(--side)] text-[var(--fg)] relative overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 bg-gradient-to-br from-[#1E2024] to-[#121316] select-none">
      {/* Top Floating Controls */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-[#282a2e]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs shadow-lg">
        <span className="font-medium">MailFlow Mobile</span>
        <span className="text-white/40">·</span>
        <button
          onClick={onToggleFrame}
          className="text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
        >
          {enabled ? 'Plein écran' : 'Cadre Android'}
        </button>
      </div>

      {/* Android Device Outer Bezel */}
      <div
        className="relative w-full max-w-[420px] h-[890px] max-h-[95vh] rounded-[48px] p-[10px] shadow-2xl transition-all"
        style={{
          background: 'linear-gradient(145deg, #383b42, #18191c)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 4px rgba(255,255,255,0.2)'
        }}
      >
        {/* Device Inner Screen Container */}
        <div className="relative w-full h-full rounded-[40px] overflow-hidden flex flex-col bg-[var(--side)] border border-black/40">
          
          {/* Android Status Bar */}
          <div className="h-10 flex-none flex items-center justify-between px-6 relative z-40 select-none">
            {/* Clock */}
            <span style={{ color: textColor }} className="text-xs font-semibold tracking-tight">
              {time}
            </span>

            {/* Camera Punch Hole */}
            <div className="absolute left-1/2 top-2.5 -translate-x-1/2 w-4 h-4 rounded-full bg-black/90 ring-1 ring-white/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#111c2e]" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5" style={{ color: textColor }}>
              {/* Cellular */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.25C3.12 16.48 2.38 14.33 2.38 12c0-5.31 4.31-9.62 9.62-9.62 5.31 0 9.62 4.31 9.62 9.62 0 2.33-.74 4.48-1.97 6.25l-.62-.64C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zM12 7c-2.76 0-5 2.24-5 5 0 1.25.46 2.39 1.22 3.28l.71-.71C8.35 13.9 8 13 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1-.35 1.9-.93 2.57l.71.71C16.54 14.39 17 13.25 17 12c0-2.76-2.24-5-5-5zM12 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
              </svg>
              {/* Wifi */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 3c3.78 0 7.22 1.47 9.79 3.86L12 18.77 2.21 10.86A13.94 13.94 0 0 1 12 7z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
                <div className="w-3.5 h-full rounded-[1.5px] bg-current" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
            {children}
          </div>

          {/* Android Gesture Bar */}
          <div className="h-4 flex-none flex items-center justify-center relative z-40">
            <div
              className="w-28 h-1 rounded-full opacity-60"
              style={{ background: textColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
