import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface TierCardsGridProps {
    tier: 1 | 2 | 3;
    cards: Card[];
    deckCount: number;
    canBuy: (card: Card) => boolean;
    canReserve: boolean;
    onBuy: (card: Card) => void;
    onReserve: (card: Card) => void;
    disabled: boolean;
}

const TierCardsGrid: React.FC<TierCardsGridProps> = ({
    tier,
    cards,
    deckCount,
    canBuy,
    canReserve,
    onBuy,
    onReserve,
    disabled
}) => {
    const tierLabels = {
        1: 'I',
        2: 'II',
        3: 'III',
    };

    return (
        <div className="">
            {/* Horizontal Row: Thin Bar + 4 Cards - تغییر ml برای جابجایی کل ردیف */}
            <div className="flex items-start ml-[0px] pl-20">

                {/* Luxurious Vertical Indicator Bar */}
                <div
                    className={`w-8 h-[127px] shrink-0 rounded-lg border-2 flex flex-col items-center justify-between py-2 shadow-2xl relative overflow-hidden ${tier === 1 ? 'border-green-400/60' : tier === 2 ? 'border-yellow-400/60' : 'border-blue-400/60'
                        }`}
                    style={{
                        backgroundImage: `url('/assets/tier-textures/tier-${tier}.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40"></div>

                    {/* Inner glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            boxShadow: tier === 1
                                ? 'inset 0 0 10px rgba(16, 185, 129, 0.5)'
                                : tier === 2
                                    ? 'inset 0 0 10px rgba(251, 191, 36, 0.5)'
                                    : 'inset 0 0 10px rgba(96, 165, 250, 0.5)'
                        }}
                    ></div>

                    {/* Tier Label with elegant styling */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${tier === 1 ? 'bg-green-900/60' : tier === 2 ? 'bg-yellow-900/60' : 'bg-blue-900/60'
                            } border ${tier === 1 ? 'border-green-300/40' : tier === 2 ? 'border-yellow-300/40' : 'border-blue-300/40'
                            } shadow-lg`}>
                            <span className="text-white text-[9px] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Georgia, serif' }}>
                                {tierLabels[tier]}
                            </span>
                        </div>
                    </div>

                    {/* Deck Count with gem-like appearance */}
                    <div className="relative z-10">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-xl border-2 ${tier === 1 ? 'bg-gradient-to-br from-green-500 to-green-700 border-green-300/50'
                            : tier === 2 ? 'bg-gradient-to-br from-yellow-500 to-yellow-700 border-yellow-300/50'
                                : 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-300/50'
                            }`}>
                            <span className="text-[8px] text-white font-black drop-shadow-md">{deckCount}</span>
                            {/* Gem shine effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>

                {/* 4 Cards in a row - استفاده از mr برای جابجایی نسبت به ستون راست */}
                <div className="flex gap-0 flex-1 -mr-[20px]">
                    {cards.map((card, index) => (
                        <div key={card.id} className={`shrink-0 w-[92px] h-32 relative hover:z-20 transition-all duration-200`}>
                            <div className="transform scale-[0.72] origin-top-left">
                                <CardComponent
                                    card={card}
                                    canBuy={!disabled && canBuy(card)}
                                    canReserve={!disabled && canReserve}
                                    onBuy={() => onBuy(card)}
                                    onReserve={() => onReserve(card)}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TierCardsGrid;
