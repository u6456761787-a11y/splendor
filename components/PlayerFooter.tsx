import React from 'react';
import { Player, Card, GemColor } from '../types';
import GemIcon from './GemIcon';

interface PlayerFooterProps {
    player: Player;
    reservedCards: Card[];
    onBuyReserved: (card: Card) => void;
    canAffordCard: (card: Card) => boolean;
    isTurn: boolean;
}

const PlayerFooter: React.FC<PlayerFooterProps> = ({
    player,
    reservedCards,
    onBuyReserved,
    canAffordCard,
    isTurn
}) => {
    return (
        <div className="h-12 border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-40 shrink-0 px-1 py-0.5">

            {/* Single Row: Score + Tokens + Bonuses + Reserved + Reserved Label */}
            <div className="flex items-center justify-between gap-1">

                {/* Player Score - Left */}
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/60 rounded border border-yellow-600/50">
                    <span className="text-lg font-serif font-bold text-white leading-none">{player.score}</span>
                    <span className="text-[10px] text-yellow-500 font-bold">VP</span>
                </div>

                {/* Tokens - Compact */}
                <div className="flex gap-1.5">
                    {[GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black].map(color => (
                        <div key={color} className="relative flex flex-col items-center">
                            <div className="w-8 h-8" title={color}>
                                <GemIcon color={color} size="md" className="scale-110" />
                            </div>
                            <div className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold border ${player.tokens[color] > 0
                                ? 'bg-slate-800 text-white border-slate-500'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                                }`}>
                                {player.tokens[color]}
                            </div>
                            {/* Color Label */}
                            <span className="text-[8px] text-slate-400 mt-0.5 font-sans uppercase tracking-wider">{
                                color === GemColor.White ? 'WHT' :
                                    color === GemColor.Blue ? 'BLU' :
                                        color === GemColor.Green ? 'GRN' :
                                            color === GemColor.Red ? 'RED' : 'BLK'
                            }</span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-700"></div>

                {/* Bonus Cards - Compact */}
                <div className="flex gap-0.5">
                    {[GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black].map(color => (
                        <div
                            key={color}
                            className={`w-6 h-8 rounded border flex items-center justify-center text-[11px] font-bold ${color === GemColor.White ? 'bg-slate-200 text-black border-slate-300' :
                                color === GemColor.Blue ? 'bg-blue-700 text-white border-blue-600' :
                                    color === GemColor.Green ? 'bg-emerald-700 text-white border-emerald-600' :
                                        color === GemColor.Red ? 'bg-red-700 text-white border-red-600' :
                                            'bg-slate-700 text-white border-slate-600'
                                }`}
                        >
                            {player.cards[color]}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-700"></div>

                {/* Reserved Cards - Enhanced with Points */}
                <div className="flex gap-1">
                    {reservedCards.map(card => (
                        <button
                            key={card.id}
                            onClick={() => onBuyReserved(card)}
                            disabled={false}
                            className={`w-9 h-10 rounded border relative transition-all ${isTurn && canAffordCard(card)
                                ? 'border-green-500 hover:scale-110 active:scale-95 cursor-pointer'
                                : 'border-slate-700 opacity-60 cursor-not-allowed'
                                }`}
                        >
                            {/* Card Background - Image or Color */}
                            {card.img ? (
                                <div
                                    className="absolute inset-0 rounded bg-cover bg-center opacity-90"
                                    style={{ backgroundImage: `url(${card.img})` }}
                                ></div>
                            ) : (
                                <div className={`absolute inset-0 rounded opacity-60 ${card.gemColor === GemColor.White ? 'bg-slate-200' :
                                    card.gemColor === GemColor.Blue ? 'bg-blue-500' :
                                        card.gemColor === GemColor.Green ? 'bg-emerald-500' :
                                            card.gemColor === GemColor.Red ? 'bg-red-500' :
                                                'bg-slate-500'
                                    }`}></div>
                            )}

                            {/* Points Badge - Most Important */}
                            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-yellow-500 border border-slate-900 flex items-center justify-center shadow-md z-10">
                                <span className="text-slate-900 font-serif font-bold text-[10px]">{card.points}</span>
                            </div>



                            {/* Can Afford Indicator */}
                            {canAffordCard(card) && (
                                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            )}
                        </button>
                    ))}
                    {[...Array(3 - reservedCards.length)].map((_, i) => (
                        <div
                            key={i}
                            className="w-9 h-10 rounded border border-dashed border-slate-800 bg-slate-900/30"
                        ></div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default PlayerFooter;
