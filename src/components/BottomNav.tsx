import React from 'react';
import { Icon } from './Icon';

interface NavItem {
  id: number;
  label: string;
  glyph: string;
  badgeCount: number;
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
    { id: 3, label: 'Newsletters', glyph: 'newspaper', badgeCount: newsCount },
    { id: 4, label: 'Formations', glyph: 'school', badgeCount: trainingsCount },
    { id: 5, label: 'Règles', glyph: 'bolt', badgeCount: 0 },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className={`flex-none w-full flex items-center justify-around px-2 pt-2 bg-[var(--side)] border-t border-[var(--line)]/50 z-30 select-none ${
        isNative ? 'pb-safe' : 'pb-2'
      }`}
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className="flex flex-col items-center justify-center gap-1 py-0.5 px-2 rounded-2xl relative transition-all active:scale-95 cursor-pointer"
            style={{
              color: isActive ? 'var(--accent)' : 'var(--sub)',
            }}
          >
            {/* Active Pill background */}
            <div
              className={`w-14 h-8 rounded-full flex items-center justify-center relative transition-all duration-200 ${
                isActive ? 'bg-[var(--accent-soft)]' : 'bg-transparent'
              }`}
            >
              <Icon
                name={item.glyph}
                size={22}
                filled={isActive}
                weight={isActive ? 600 : 400}
                style={{
                  color: isActive ? 'var(--accent-fg)' : 'inherit',
                }}
              />

              {/* Badge Counter */}
              {item.badgeCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10.5px] font-bold flex items-center justify-center shadow-xs"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'var(--sub)',
                    color: isActive ? (dark ? '#0B1B33' : '#FFFFFF') : '#FFFFFF',
                  }}
                >
                  {item.badgeCount}
                </span>
              )}
            </div>

            {/* Tab Label */}
            <span
              className={`text-[10px] tracking-tight transition-all truncate max-w-[64px] ${
                isActive ? 'font-bold text-[var(--fg)]' : 'font-medium text-[var(--sub)]'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
