import React from 'react';
import { GemColor } from '../types';

interface GemIconProps {
  color: GemColor | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  count?: number;
}

const GemIcon: React.FC<GemIconProps> = ({ color, size = 'md', className = '', count }) => {
  // Map color to token image
  const getTokenImage = (color: GemColor | string): string => {
    switch (color) {
      case GemColor.White:
        return '/assets/tokens/white.png';
      case GemColor.Blue:
        return '/assets/tokens/blue.png';
      case GemColor.Green:
        return '/assets/tokens/green.png';
      case GemColor.Red:
        return '/assets/tokens/red.png';
      case GemColor.Black:
        return '/assets/tokens/black.png';
      default:
        return '';
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const tokenImage = getTokenImage(color);

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Token Image */}
      {tokenImage && (
        <img
          src={tokenImage}
          alt={`${color} token`}
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        />
      )}

      {/* Number Count - positioned on top of the image */}
      {count !== undefined && (
        <span
          className="absolute inset-0 flex items-center justify-center z-10 font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ textShadow: '0 0 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.9)' }}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default GemIcon;