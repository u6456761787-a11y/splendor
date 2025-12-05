
import React from 'react';
import { Player, GemColor } from '../types';

interface OpponentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    opponents: Player[];
    currentPlayerIndex: number;
}

const OpponentsModal: React.FC<OpponentsModalProps> = ({ isOpen, onClose, opponents, currentPlayerIndex }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 rounded-2xl border border-blue-600/30 shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                        <span>👥</span>
                        بازیکنان
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Opponents List */}
                <div className="p-4 space-y-3">
                    {opponents.map(player => {
                        const isCurrentTurn = player.id === currentPlayerIndex;
                        return (
                            <div
                                key={player.id}
                                className={`bg-slate-800/50 rounded-xl border-2 p-4 shadow-lg transition-all ${isCurrentTurn
                                        ? 'border-yellow-500 shadow-yellow-500/20'
                                        : 'border-slate-700'
                                    }`}
                            >
                                {/* Header: Name & Score */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-white">{player.name}</span>
                                        {isCurrentTurn && <span className="text-yellow-500 text-sm">← در حال بازی</span>}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-serif font-bold text-white">{player.score}</div>
                                        <div className="text-[10px] text-yellow-500 font-bold">امتیاز</div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                                        <div className="text-xl font-bold text-white">
                                            {Object.values(player.tokens).reduce((a: any, b: any) => a + b, 0)}
                                        </div>
                                        <div className="text-[10px] text-slate-400">توکن</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                                        <div className="text-xl font-bold text-emerald-400">
                                            {player.purchasedCards.length}
                                        </div>
                                        <div className="text-[10px] text-slate-400">کارت</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                                        <div className="text-xl font-bold text-yellow-500">
                                            {player.nobles.length}
                                        </div>
                                        <div className="text-[10px] text-slate-400">شریف</div>
                                    </div>
                                </div>

                                {/* Bonus Cards */}
                                <div className="flex gap-1.5 justify-center">
                                    {[GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black].map(color => (
                                        <div
                                            key={color}
                                            className={`w-8 h-10 rounded border flex items-center justify-center text-xs font-bold ${color === GemColor.White ? 'bg-slate-200 text-black border-slate-300' :
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
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-bold transition-colors"
                    >
                        بستن
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpponentsModal;
