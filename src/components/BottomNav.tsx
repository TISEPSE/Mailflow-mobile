import React from 'react';
import { Icon } from './Icon';

interface NavItem {
  id: number;
  label: string;
  glyph: string;
  badgeCount: number;
  activePillBg?: string;
  activeColor?: string;
}

interface BottomNavProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
  unreadCount: number;
  promosCount: number;
  newsCount: number;
  trainingsCount: number;
  isNative?: boolean;
  dark?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  unreadCount,
  promosCount,
  newsCount,
  trainingsCount,
  isNative = false,
  dark = false,
}) => {
  const navItems: NavItem[] = [
    { id: 1, label: 'Mails', glyph: 'inbox', badgeCount: unreadCount },
    { id: 2, label: 'Pubs', glyph: 'sell', badgeCount: promosCount },
    { id: 3, label: 'News', glyph: 'calendar_month', badgeCount: newsCount },
    { id: 4, label: 'Formations', glyph: 'school', badgeCount: trainingsCount },
    { 
      id: 5, 
      label: 'Règles', 
      glyph: 'bolt', 
      badgeCount: 0,
      activePillBg: dark ? '#4A4458' : '#E8DEF8',
      activeColor: dark ? '#D0BCFF' : '#6750A4'
    },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className={`flex-none w-full bg-[var(--side)] border-t border-[var(--line)]/40 z-30 select-none ${
        isNative ? 'pb-safe pt-1.5' : 'pb-2 pt-1.5'
      }`}
    >
      <div className="grid grid-cols-5 w-full">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const activeBg = item.activePillBg || (dark ? '#0842A0' : '#D3E3FD');
          const activeFg = item.activeColor || (dark ? '#A8C7FA' : '#0B57D0');
          
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="w-full flex flex-col items-center justify-center py-0.5 px-0 relative cursor-pointer active:scale-95 transition-transform"
            >
              {/* Active Indicator Pill - Perfectly Centered */}
              <div
                className="w-14 h-8 rounded-full flex items-center justify-center relative transition-colors duration-150"
                style={{
                  backgroundColor: isActive ? activeBg : 'transparent',
                }}
              >
                <Icon
                  name={item.glyph}
                  size={22}
                  filled={isActive}
                  weight={isActive ? 600 : 400}
                  style={{
                    color: isActive ? activeFg : 'var(--sub)',
                  }}
                />

                {/* Red Circular Badge anchored relative to top right of pill */}
                {item.badgeCount > 0 && (
                  <span
                    className="absolute top-0 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full text-[9.5px] font-bold flex items-center justify-center shadow-xs bg-[#B3261E] text-white pointer-events-none"
                  >
                    {item.badgeCount}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span
                className={`text-[10.5px] tracking-tight transition-colors truncate max-w-full mt-0.5 ${
                  isActive 
                    ? 'font-bold text-[var(--fg)]' 
                    : 'font-medium text-[var(--sub)]'
                }`}
                style={{
                  color: isActive && item.activeColor ? item.activeColor : undefined
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
