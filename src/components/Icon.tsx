import React from 'react';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  filled?: boolean;
  weight?: number;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 22,
  className = '',
  filled = false,
  weight = 400,
  style = {}
}) => {
  const parsedSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`material-symbols-rounded select-none flex items-center justify-center ${className}`}
      style={{
        fontFamily: "'Material Symbols Rounded'",
        fontSize: parsedSize,
        width: parsedSize,
        height: parsedSize,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        lineHeight: 1,
        ...style
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
