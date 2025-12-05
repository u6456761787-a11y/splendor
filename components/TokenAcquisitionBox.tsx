import React from 'react';
import { GemColor } from '../types';
import GemIcon from './GemIcon';

interface TokenAcquisitionBoxProps {
    bank: { [key in GemColor]: number };
    selectedTokens: GemColor[];
    onTokenClick: (color: GemColor) => void;
    onConfirmTokens: () => void;
    isTurn: boolean;
}

const TokenAcquisitionBox: React.FC<TokenAcquisitionBoxProps> = ({
    bank,
    selectedTokens,
    onTokenClick,
    onConfirmTokens,
    isTurn
}) => {
    return (
        <div className="h-auto py-1.5 flex items-center justify-center gap-1.5 px-1.5 z-40 shrink-0">
            {/* Bank Tokens */}
            <div className="flex gap-[18px]">
                {[GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black].map(color => {
                    const selectionCount = selectedTokens.filter(t => t === color).length;
                    return (
                        <button
                            key={color}
                            onClick={() => isTurn && onTokenClick(color)}
                            disabled={!isTurn || bank[color] === 0}
                            className={`relative transition-all ${selectionCount > 0
                                ? 'scale-105'
                                : bank[color] === 0
                                    ? 'opacity-50 cursor-not-allowed grayscale'
                                    : 'hover:scale-105 active:scale-95'
                                }`}
                            style={{ width: '36px', height: '36px' }}
                        >
                            <div style={{ transform: 'scale(1.73)' }}>
                                <GemIcon color={color} size="md" />
                            </div>
                            {/* Bank count badge */}
                            <div className="absolute -bottom-0.5 -right-0.5 text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold bg-slate-800 text-white border border-slate-600">
                                {bank[color]}
                            </div>
                            {/* Selection badge */}
                            {selectionCount > 0 && (
                                <div className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-black font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border-2 border-slate-900 z-20 shadow-lg text-[8px]">
                                    {selectionCount}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Confirm Button */}
            {selectedTokens.length > 0 && (
                <button
                    onClick={onConfirmTokens}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded font-bold text-[15px] transition-all active:scale-95 border border-green-400 shadow-md"
                >
                    ✓
                </button>
            )}
        </div>
    );
};

export default TokenAcquisitionBox;
