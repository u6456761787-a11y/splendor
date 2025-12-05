import React from 'react';
import { GemColor } from '../types';
import GemIcon from './GemIcon';

interface TokenBottomSheetProps {
    isOpen: boolean;
    onToggle: () => void;
    bank: { [key in GemColor]: number };
    selectedTokens: GemColor[];
    onTokenClick: (color: GemColor) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const TokenBottomSheet: React.FC<TokenBottomSheetProps> = ({
    isOpen,
    onToggle,
    bank,
    selectedTokens,
    onTokenClick,
    onConfirm,
    onCancel
}) => {
    return (
        <>
            {/* Horizontal Token Menu - Same Level as FAB */}
            <div className={`fixed bottom-[72px] left-[16px] z-40 transition-all duration-500 ease-out origin-left ${isOpen ? 'translate-x-[48px] opacity-100 scale-100' : 'translate-x-0 opacity-0 scale-0 pointer-events-none'
                }`}>
                <div className="bg-slate-900 backdrop-blur-xl border-2 border-slate-600 shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-full p-2 flex items-center gap-1 pl-3">
                    {/* Token Buttons */}
                    {[GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black].map((color, index) => {
                        const selectionCount = selectedTokens.filter(t => t === color).length;
                        return (
                            <button
                                key={color}
                                onClick={() => onTokenClick(color)}
                                disabled={bank[color] === 0}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={`relative w-10 h-10 rounded-full border transition-all duration-300 shadow-lg ${selectionCount > 0
                                    ? 'border-yellow-500 bg-yellow-500/20 scale-110'
                                    : bank[color] === 0
                                        ? 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed grayscale'
                                        : 'border-slate-700 bg-slate-800/90 hover:bg-slate-700 active:scale-95'
                                    } ${isOpen ? 'scale-100' : 'scale-0'}`}
                            >
                                <GemIcon color={color} size="sm" count={bank[color]} />

                                {/* Selection Badge */}
                                {selectionCount > 0 && (
                                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-black font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 z-20 shadow-lg text-xs">
                                        {selectionCount}
                                    </div>
                                )}
                            </button>
                        );
                    })}

                    {/* Action Buttons */}
                    {selectedTokens.length > 0 && (
                        <>
                            <div className="w-px h-6 bg-slate-600 mx-1"></div>
                            <button
                                onClick={onConfirm}
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm flex items-center justify-center border border-blue-400"
                            >
                                ✓
                            </button>
                            <button
                                onClick={onCancel}
                                className="w-8 h-8 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm flex items-center justify-center border border-red-400"
                            >
                                ✕
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* FAB - Bottom of PlayerFooter */}
            <button
                onClick={onToggle}
                className={`fixed bottom-16 left-4 w-10 h-10 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center ${isOpen
                    ? 'bg-red-600 hover:bg-red-500 border-2 border-red-400 rotate-45 scale-110'
                    : 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-2 border-blue-400 hover:scale-110 animate-pulse'
                    }`}
            >
                <span className="text-xl text-white font-bold">
                    {isOpen ? '✕' : '💰'}
                </span>
            </button>
        </>
    );
};

export default TokenBottomSheet;
