
import React from 'react';
import { Card, GemColor } from '../types';
import GemIcon from './GemIcon';

interface CardProps {
  card: Card;
  canBuy: boolean;
  canReserve: boolean;
  onBuy?: () => void;
  onReserve?: () => void;
  disabled?: boolean;
}

const CardComponent: React.FC<CardProps> = ({ card, canBuy, canReserve, onBuy, onReserve, disabled }) => {
  // Border color indicates Tier level (Difficulty)
  const tierBorderColor = {
    1: 'border-green-500/60',
    2: 'border-yellow-500/60',
    3: 'border-blue-500/60',
  };

  // Background gradients fallback
  const artStyles: { [key in GemColor]: string } = {
    [GemColor.White]: 'from-slate-500 via-slate-300 to-white',     // Diamond
    [GemColor.Blue]: 'from-blue-950 via-blue-800 to-cyan-600',      // Sapphire
    [GemColor.Green]: 'from-green-950 via-emerald-800 to-emerald-500', // Emerald
    [GemColor.Red]: 'from-red-950 via-red-800 to-rose-600',         // Ruby
    [GemColor.Black]: 'from-gray-950 via-slate-800 to-slate-600',   // Onyx
  };

  return (
    <div className={`relative group w-32 h-44 rounded-lg border-2 ${tierBorderColor[card.tier]} bg-slate-900 shadow-xl flex flex-col transition-all duration-300 hover:scale-105 hover:z-10 overflow-hidden`}>

      {/* Background Image or Gradient */}
      <div className="absolute inset-0 z-0">
        {card.img ? (
          <>
            <img src={card.img} alt="Card Art" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${artStyles[card.gemColor]} opacity-40 group-hover:opacity-50 transition-opacity`}></div>

            {/* Decorative Pattern Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 128 176" preserveAspectRatio="xMidYMid slice">
              {/* Ornamental Border Frame */}
              <rect x="8" y="8" width="112" height="160" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40" rx="4" />
              <rect x="12" y="12" width="104" height="152" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-white/30" rx="3" />

              {/* Corner Decorations */}
              <circle cx="20" cy="20" r="3" fill="currentColor" className="text-white/50" />
              <circle cx="108" cy="20" r="3" fill="currentColor" className="text-white/50" />
              <circle cx="20" cy="156" r="3" fill="currentColor" className="text-white/50" />
              <circle cx="108" cy="156" r="3" fill="currentColor" className="text-white/50" />

              {/* Central Gem Pattern */}
              <g transform="translate(64, 88)">
                {/* Large Diamond Shape */}
                <path d="M 0,-25 L 15,-10 L 0,25 L -15,-10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40" />
                <path d="M 0,-20 L 12,-8 L 0,20 L -12,-8 Z" fill="currentColor" className="text-white/10" />

                {/* Inner Facets */}
                <line x1="0" y1="-20" x2="0" y2="20" stroke="currentColor" strokeWidth="0.8" className="text-white/30" />
                <line x1="-12" y1="-8" x2="12" y2="-8" stroke="currentColor" strokeWidth="0.8" className="text-white/30" />
                <line x1="-12" y1="-8" x2="0" y2="20" stroke="currentColor" strokeWidth="0.8" className="text-white/30" />
                <line x1="12" y1="-8" x2="0" y2="20" stroke="currentColor" strokeWidth="0.8" className="text-white/30" />
              </g>

              {/* Decorative Side Patterns */}
              <g className="text-white/20">
                {/* Left side ornaments */}
                <circle cx="24" cy="50" r="2" fill="currentColor" />
                <circle cx="24" cy="70" r="2" fill="currentColor" />
                <circle cx="24" cy="90" r="2" fill="currentColor" />
                <circle cx="24" cy="110" r="2" fill="currentColor" />
                <circle cx="24" cy="130" r="2" fill="currentColor" />

                {/* Right side ornaments */}
                <circle cx="104" cy="50" r="2" fill="currentColor" />
                <circle cx="104" cy="70" r="2" fill="currentColor" />
                <circle cx="104" cy="90" r="2" fill="currentColor" />
                <circle cx="104" cy="110" r="2" fill="currentColor" />
                <circle cx="104" cy="130" r="2" fill="currentColor" />
              </g>

              {/* Top decorative arc */}
              <path d="M 40,30 Q 64,25 88,30" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30" />
              <path d="M 45,35 Q 64,31 83,35" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-white/20" />

              {/* Bottom decorative arc */}
              <path d="M 40,146 Q 64,151 88,146" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30" />
              <path d="M 45,141 Q 64,145 83,141" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-white/20" />
            </svg>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent scale-150"></div>
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-2">

        {/* Header: Points */}
        <div className="flex justify-between items-start mb-1" dir="ltr">
          <span className={`text-2xl font-serif font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] ${card.points > 0 ? 'text-white' : 'text-transparent'}`}>
            {card.points}
          </span>
        </div>

        {/* Spacer to push cost to bottom */}
        <div className="flex-grow"></div>

        {/* Cost Area */}
        <div className="flex flex-wrap gap-1 mt-auto bg-slate-950/80 p-1.5 rounded-md backdrop-blur-md border border-white/10 shadow-lg justify-start items-center" dir="ltr">
          {Object.entries(card.cost).map(([colorKey, amount]) => {
            if (!amount) return null;
            const color = colorKey as GemColor;

            // تعیین رنگ پس‌زمینه بر اساس نوع جواهر
            let bgColor = '';
            switch (color) {
              case GemColor.White:
                bgColor = 'bg-slate-100 text-black';
                break;
              case GemColor.Blue:
                bgColor = 'bg-blue-600 text-white';
                break;
              case GemColor.Green:
                bgColor = 'bg-emerald-600 text-white';
                break;
              case GemColor.Red:
                bgColor = 'bg-red-600 text-white';
                break;
              case GemColor.Black:
                bgColor = 'bg-slate-800 text-white';
                break;
            }

            return (
              <div key={colorKey} className={`w-5 h-5 rounded-full border border-slate-600/50 shadow-inner flex items-center justify-center text-xs font-bold leading-none ring-1 ring-black/30 ${bgColor}`}>
                {amount}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Overlay */}
      {!disabled && (canBuy || canReserve) && (
        <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 gap-3 z-20 backdrop-blur-[2px]">
          {canBuy && (
            <button
              onClick={(e) => { e.stopPropagation(); onBuy?.(); }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded shadow-lg font-bold text-sm w-24 transform hover:scale-105 border border-emerald-400/30"
            >
              خرید
            </button>
          )}
          {canReserve && (
            <button
              onClick={(e) => { e.stopPropagation(); onReserve?.(); }}
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-1.5 rounded shadow-lg font-bold text-sm w-24 transform hover:scale-105 border border-yellow-400/30"
            >
              رزرو
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardComponent;