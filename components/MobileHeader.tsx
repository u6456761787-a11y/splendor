import React from 'react';
import { Player, Noble } from '../types';

interface MobileHeaderProps {
    currentPlayer: Player;
    turn: number;
    noblesCount: number;
    onNoblesClick: () => void;
    onOpponentsClick: () => void;
    opponents: Player[];
    currentPlayerIndex: number;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
    currentPlayer,
    turn,
    noblesCount,
    onNoblesClick,
    onOpponentsClick,
    opponents,
    currentPlayerIndex
}) => {
    // MobileHeader content without Nobles button
    return (
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-2 shadow-xl z-50 shrink-0 gap-2">

            {/* Center: Opponents List (Full Width) */}
            <div className="flex-1 flex items-center gap-1 px-0.5 justify-center h-full">
                {opponents.map((player) => {
                    const isTurn = player.id === currentPlayerIndex;

                    return (
                        <div
                            key={player.id}
                            className={`flex-1 flex flex-col items-center justify-center h-full max-h-14 rounded-lg border-2 px-1 py-1 transition-all ${player.id === currentPlayerIndex
                                ? 'bg-slate-800 border-yellow-500/70 shadow-lg'
                                : 'bg-slate-900/50 border-slate-700 opacity-80'
                                }`}
                        >
                            <div className="flex items-center justify-between w-full mb-1">
                                <span className="text-xs font-bold text-slate-300 truncate max-w-[50px]">{player.name}</span>
                                <div className="flex items-center gap-1.5">
                                    {/* Reserved Cards Indicator */}
                                    {player.reserved.length > 0 && (
                                        <div className="flex items-center justify-center w-4 h-5 bg-yellow-600 rounded border border-yellow-400 shadow-sm" title="کارت‌های رزرو شده">
                                            <span className="text-[10px] font-bold text-white">{player.reserved.length}</span>
                                        </div>
                                    )}
                                    {/* Score */}
                                    <div className="flex items-center gap-0.5">
                                        <span className="text-lg font-serif font-bold text-white leading-none">{player.score}</span>
                                        <span className="text-[9px] text-yellow-500 font-bold">VP</span>
                                    </div>
                                </div>
                            </div>
                            {/* Card and Token Display */}
                            <div className="flex flex-col gap-0.5 w-full mt-auto">
                                {/* Cards Row - Top */}
                                <div className="flex gap-0.5 justify-center">
                                    {[
                                        { color: 'White', bg: 'bg-slate-200', text: 'text-black' },
                                        { color: 'Blue', bg: 'bg-blue-600', text: 'text-white' },
                                        { color: 'Green', bg: 'bg-emerald-600', text: 'text-white' },
                                        { color: 'Red', bg: 'bg-red-600', text: 'text-white' },
                                        { color: 'Black', bg: 'bg-slate-800', text: 'text-white' }
                                    ].map(({ color, bg, text }) => {
                                        const cardCount = player.cards[color as keyof typeof player.cards] || 0;
                                        if (cardCount === 0) return null;

                                        return (
                                            <div key={color} className={`w-3.5 h-3.5 ${bg} ${text} rounded-sm flex items-center justify-center text-[8px] font-bold border border-white/20`}>
                                                {cardCount}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Tokens Row - Bottom */}
                                <div className="flex gap-0.5 justify-center">
                                    {[
                                        { color: 'White', bg: 'bg-slate-200', text: 'text-black' },
                                        { color: 'Blue', bg: 'bg-blue-600', text: 'text-white' },
                                        { color: 'Green', bg: 'bg-emerald-600', text: 'text-white' },
                                        { color: 'Red', bg: 'bg-red-600', text: 'text-white' },
                                        { color: 'Black', bg: 'bg-slate-800', text: 'text-white' }
                                    ].map(({ color, bg, text }) => {
                                        const tokenCount = player.tokens[color as keyof typeof player.tokens] || 0;
                                        if (tokenCount === 0) return null;

                                        return (
                                            <div key={color} className={`w-3.5 h-3.5 ${bg} ${text} rounded-full flex items-center justify-center text-[8px] font-bold border border-white/20`}>
                                                {tokenCount}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileHeader;
