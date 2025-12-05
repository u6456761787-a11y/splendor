
import React from 'react';
import { Noble, GemColor } from '../types';

interface NoblesModalProps {
    isOpen: boolean;
    onClose: () => void;
    nobles: Noble[];
}

const NoblesModal: React.FC<NoblesModalProps> = ({ isOpen, onClose, nobles }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 rounded-2xl border border-yellow-600/30 shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
                        <span>👑</span>
                        اشراف
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Nobles List */}
                <div className="p-4 space-y-3">
                    {nobles.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">هیچ شریفی باقی نماند</p>
                    ) : (
                        nobles.map(noble => (
                            <div
                                key={noble.id}
                                className="bg-slate-800/50 rounded-xl border-2 border-yellow-600/50 p-4 flex items-center gap-4 shadow-lg"
                            >
                                {/* Points */}
                                <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-yellow-500 flex items-center justify-center shrink-0">
                                    <span className="text-3xl font-serif font-bold text-white">{noble.points}</span>
                                </div>

                                {/* Requirements */}
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 mb-2 font-bold">نیازمندی‌ها:</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(noble.requirements).map(([color, count]) => (
                                            <div
                                                key={color}
                                                className={`flex items-center gap-1.5 p-2 rounded border ${color === GemColor.White ? 'bg-slate-200 border-slate-300' :
                                                        color === GemColor.Blue ? 'bg-blue-700 border-blue-600' :
                                                            color === GemColor.Green ? 'bg-emerald-700 border-emerald-600' :
                                                                color === GemColor.Red ? 'bg-red-700 border-red-600' :
                                                                    'bg-slate-700 border-slate-600'
                                                    }`}
                                            >
                                                <span className={`text-sm font-bold ${color === GemColor.White ? 'text-black' : 'text-white'}`}>
                                                    {count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
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

export default NoblesModal;
