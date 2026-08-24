import React from 'react';
import { Icon } from './Icon';

interface NavItem {
  id: number;
  label: string;
  glyph: string;
  badgeCount: number;
  tone: string;
}

interface BottomNavProps {
  currentTab: number;
  onSelectTab: (tab: number) => void;
  unreadCount: number;
  promosCount: number;
  newsCount: number;
  trainingsCount: number;
  dark?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  unreadCount,
  promosCount,
  newsCount,
  trainingsCount,
  dark = false,
}) => {
  const navItems: NavItem[] = [
    { id: 1, label: 'Mails', glyph: 'person', badgeCount: unreadCount, tone: 'humain' },
    { id: 2, label: 'Pubs', glyph: 'sell', badgeCount: promosCount, tone: 'publicite' },
    { id: 3, label: 'News', glyph: 'newspaper', badgeCount: newsCount, tone: 'newsletter' },
    { id: 4, label: 'Formations', glyph: 'school', badgeCount: trainingsCount, tone: 'formation' },
    { id: 5, label: 'Règles', glyph: 'bolt', badgeCount: 0, tone: 'regle' },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className="flex-none flex items-center justify-around px-2 pt-1.5 pb-2 bg-[var(--side)] border-t border-[var(--line)]/50 z-30 select-none"
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className="flex flex-col items-center justify-center gap-0.5 py-1 px-2.5 rounded-2xl relative transition-all active:scale-95"
            style={{
              color: isActive ? 'var(--accent)' : 'var(--sub)',
            }}
          >
            {/* Active Pill background */}
            <div
              className={`w-12 h-7 rounded-full flex items-center justify-center relative transition-all duration-200 ${
                isActive ? 'bg-[var(--accent-soft)]' : 'bg-transparent'
              }`}
            >
              <Icon
                name={item.glyph}
                size={20}
                filled={isActive}
                weight={isActive ? 600 : 400}
                style={{
                  color: isActive ? 'var(--accent-fg)' : 'inherit',
                }}
              />

              {/* Badge Counter */}
              {item.badgeCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs"
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
              className={`text-[10.5px] tracking-tight transition-all ${
                isActive ? 'font-semibold text-[var(--fg)]' : 'font-normal text-[var(--sub)]'
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
