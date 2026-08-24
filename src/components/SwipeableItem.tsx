import React, { useState, useRef } from 'react';
import { Icon } from './Icon';

interface SwipeableItemProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftIcon?: string;
  leftLabel?: string;
  leftBg?: string;
  rightIcon?: string;
  rightLabel?: string;
  rightBg?: string;
}

export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftIcon = 'archive',
  leftBg = '#0B57D0',
  rightIcon = 'delete',
  rightBg = '#D93025'
}) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diffX = e.touches[0].clientX - startXRef.current;
    const diffY = e.touches[0].clientY - startYRef.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      // Apply rubber band resistance
      const clamped = Math.max(-140, Math.min(140, diffX));
      setOffsetX(clamped);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (offsetX < -70 && onSwipeLeft) {
      onSwipeLeft();
    } else if (offsetX > 70 && onSwipeRight) {
      onSwipeRight();
    }
    setOffsetX(0);
    isHorizontalSwipe.current = null;
  };

  return (
    <div className="relative overflow-hidden w-full select-none">
      {/* Background action reveal layers */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        {/* Left reveal (swiping right) */}
        <div
          className="h-full flex items-center pl-5 text-white transition-opacity duration-150"
          style={{
            backgroundColor: leftBg,
            width: '100%',
            opacity: offsetX > 24 ? 1 : 0
          }}
        >
          <div className="flex items-center gap-2 font-medium text-xs">
            <Icon name={leftIcon} size={20} />
          </div>
        </div>

        {/* Right reveal (swiping left) */}
        <div
          className="h-full flex items-center justify-end pr-5 text-white transition-opacity duration-150 absolute right-0 inset-y-0"
          style={{
            backgroundColor: rightBg,
            width: '100%',
            opacity: offsetX < -24 ? 1 : 0
          }}
        >
          <div className="flex items-center gap-2 font-medium text-xs">
            <Icon name={rightIcon} size={20} />
          </div>
        </div>
      </div>

      {/* Foreground sliding card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: offsetX !== 0 ? `translateX(${offsetX}px)` : 'none',
          transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1)'
        }}
        className="relative z-10 bg-[var(--card)] w-full"
      >
        {children}
      </div>
    </div>
  );
};
