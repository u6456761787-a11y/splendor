import React from 'react';
import { Player, GemColor } from '../types';

interface OpponentsSidebarProps {
    players: Player[];
    currentPlayerIndex: number;
}

const OpponentsSidebar: React.FC<OpponentsSidebarProps> = ({ players, currentPlayerIndex }) => {
    // Filter out the human player (id 0)
    const opponents = players.filter(p => p.id !== 0);

    return (
        <div className="w-32 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-y-auto shrink-0 z-10 transition-all duration-300">
            <div className="p-2 border-b border-slate-800 bg-slate-950/50 text-center">
                <h2 className="text-xs font-bold text-slate-400">
                    رقیبان
                </h2>
            </div>

            <div className="flex-1 p-1 space-y-1">
                {opponents.map((player) => {
                    const originalIndex = players.findIndex(p => p.id === player.id);
                    const isCurrentTurn = originalIndex === currentPlayerIndex;

                    return (
                        <div
                            key={player.id}
                            className={`rounded-lg p-1.5 border transition-all flex flex-col gap-1.5 ${isCurrentTurn
                                ? 'bg-slate-800 border-yellow-500/50 shadow-md'
                                : 'bg-slate-900/50 border-slate-800 opacity-70'
                                }`}
                        >
                            {/* Header: Avatar, Name, Score */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                                        {player.name.charAt(0)}
                                    </div>
                                    <span className={`text-[10px] font-bold truncate max-w-[40px] ${isCurrentTurn ? 'text-white' : 'text-slate-400'}`}>
                                        {player.name}
                                    </span>
                                </div>
                                <span className="text-sm font-serif font-bold text-yellow-500">{player.score}</span>
                            </div>

                            {/* Tokens Section */}
                            <div className="flex flex-wrap gap-0.5 justify-end">
                                {Object.entries(player.tokens).map(([color, count]) => {
                                    if ((count as number) <= 0) return null;
                                    const bgClass =
                                        color === GemColor.White ? 'bg-slate-200 text-black' :
                                            color === GemColor.Blue ? 'bg-blue-600 text-white' :
                                                color === GemColor.Green ? 'bg-emerald-600 text-white' :
                                                    color === GemColor.Red ? 'bg-red-600 text-white' :
                                                        color === GemColor.Black ? 'bg-slate-700 text-white' : 'bg-yellow-500 text-black';
                                    return (
                                        <div key={color} className={`w-3.5 h-3.5 rounded-full ${bgClass} flex items-center justify-center text-[8px] font-bold border border-black/20 shadow-sm`}>
                                            {count as number}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Cards Section */}
                            <div className="flex flex-wrap gap-0.5 justify-end">
                                {Object.entries(player.cards).map(([color, count]) => {
                                    if ((count as number) <= 0) return null;
                                    const bgClass =
                                        color === GemColor.White ? 'bg-slate-200 text-black border-slate-300' :
                                            color === GemColor.Blue ? 'bg-blue-700 text-white border-blue-600' :
                                                color === GemColor.Green ? 'bg-emerald-700 text-white border-emerald-600' :
                                                    color === GemColor.Red ? 'bg-red-700 text-white border-red-600' :
                                                        'bg-slate-700 text-white border-slate-600';
                                    return (
                                        <div key={color} className={`w-3.5 h-4.5 rounded ${bgClass} flex items-center justify-center text-[8px] font-bold border shadow-sm`}>
                                            {count as number}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer: Reserved & Nobles */}
                            {(player.reserved.length > 0 || player.nobles.length > 0) && (
                                <div className="flex justify-between pt-1 border-t border-slate-800/50 text-[8px] text-slate-500">
                                    {player.reserved.length > 0 && <span>R: {player.reserved.length}</span>}
                                    {player.nobles.length > 0 && <span>N: {player.nobles.length}</span>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OpponentsSidebar;
