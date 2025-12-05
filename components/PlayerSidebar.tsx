import React from 'react';
import { Player, GemColor } from '../types';

interface PlayerSidebarProps {
    players: Player[];
    currentPlayerIndex: number;
}

const PlayerSidebar: React.FC<PlayerSidebarProps> = ({ players, currentPlayerIndex }) => {
    return (
        <div className="w-64 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-y-auto shrink-0">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    <span>👥</span>
                    بازیکنان
                </h2>
            </div>

            <div className="flex-1 p-2 space-y-2">
                {players.map((player, index) => {
                    const isCurrentTurn = index === currentPlayerIndex;
                    const isHuman = player.id === 0;

                    return (
                        <div
                            key={player.id}
                            className={`rounded-xl p-3 border transition-all ${isCurrentTurn
                                ? 'bg-slate-800 border-yellow-500/50 shadow-lg scale-[1.02]'
                                : 'bg-slate-900/50 border-slate-800 opacity-80 hover:opacity-100'
                                }`}
                        >
                            {/* Header: Name & Score */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isHuman ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                                        }`}>
                                        {player.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${isCurrentTurn ? 'text-white' : 'text-slate-400'}`}>
                                            {player.name}
                                        </span>
                                        {isCurrentTurn && (
                                            <span className="text-[10px] text-yellow-500 animate-pulse">نوبت بازی</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-serif font-bold text-white">{player.score}</span>
                                    <span className="text-[9px] text-slate-500">امتیاز</span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                {/* Tokens */}
                                <div className="bg-slate-950/50 rounded p-1.5 flex flex-wrap gap-1 justify-center">
                                    {Object.entries(player.tokens).map(([color, count]) => (
                                        count > 0 && (
                                            <div key={color} className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border shadow-sm ${color === GemColor.White ? 'bg-white text-black border-slate-300' :
                                                color === GemColor.Blue ? 'bg-blue-600 text-white border-blue-500' :
                                                    color === GemColor.Green ? 'bg-emerald-600 text-white border-emerald-500' :
                                                        color === GemColor.Red ? 'bg-red-600 text-white border-red-500' :
                                                            color === GemColor.Black ? 'bg-slate-700 text-white border-slate-600' :
                                                                'bg-yellow-500 text-black border-yellow-400'
                                                }`}>
                                                {count}
                                            </div>
                                        )
                                    ))}
                                    {Object.values(player.tokens).reduce((a, b) => a + b, 0) === 0 && (
                                        <span className="text-slate-600">-</span>
                                    )}
                                </div>

                                {/* Cards */}
                                <div className="bg-slate-950/50 rounded p-1.5 flex flex-wrap gap-1 justify-center">
                                    {Object.entries(player.cards).map(([color, count]) => (
                                        count > 0 && (
                                            <div key={color} className={`w-3 h-4 rounded-[2px] border ${color === GemColor.White ? 'bg-white border-slate-300' :
                                                color === GemColor.Blue ? 'bg-blue-600 border-blue-500' :
                                                    color === GemColor.Green ? 'bg-emerald-600 border-emerald-500' :
                                                        color === GemColor.Red ? 'bg-red-600 border-red-500' :
                                                            'bg-slate-700 border-slate-600'
                                                }`} title={`${count} کارت`}>
                                            </div>
                                        )
                                    ))}
                                    {Object.values(player.cards).reduce((a, b) => a + b, 0) === 0 && (
                                        <span className="text-slate-600">-</span>
                                    )}
                                </div>
                            </div>

                            {/* Footer: Reserved & Nobles */}
                            <div className="flex justify-between mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-400">
                                <div className="flex items-center gap-1">
                                    <span>🃏 رزرو:</span>
                                    <span className="text-white font-bold">{player.reserved.length}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>👑 اشراف:</span>
                                    <span className="text-white font-bold">{player.nobles.length}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerSidebar;
