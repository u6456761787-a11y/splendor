import React from 'react';
import { Card, GemColor, Player } from '../types';
import { canAffordCard } from '../gameLogic';
import GemIcon from './GemIcon';

interface ReservedCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Card | null;
    player: Player;
    onBuy: (card: Card) => void;
    isTurn: boolean;
}

const ReservedCardModal: React.FC<ReservedCardModalProps> = ({ isOpen, onClose, card, player, onBuy, isTurn }) => {
    if (!isOpen || !card) return null;

    const canAfford = canAffordCard(player, card);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-yellow-600/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-slate-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-xl font-bold text-yellow-500 font-serif">کارت رزرو شده</h3>

                {/* Large Card Display */}
                <div
                    className="relative w-48 aspect-[2/3] rounded-xl border-2 border-slate-600 shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Image Background */}
                    {card.img ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${card.img})` }}
                        ></div>
                    ) : (
                        <div className={`absolute inset-0 ${card.gemColor === GemColor.White ? 'bg-slate-200' :
                                card.gemColor === GemColor.Blue ? 'bg-blue-500' :
                                    card.gemColor === GemColor.Green ? 'bg-emerald-500' :
                                        card.gemColor === GemColor.Red ? 'bg-red-500' :
                                            'bg-slate-700'
                            }`}></div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

                    {/* Points */}
                    <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-slate-900/80 border-2 border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg">
                        <span className="text-2xl font-bold text-white font-serif">{card.points}</span>
                    </div>

                    {/* Gem Icon (Top Right) */}
                    <div className="absolute top-2 right-2">
                        <GemIcon color={card.gemColor} size="md" />
                    </div>

                    {/* Cost (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-wrap justify-center gap-1">
                        {Object.entries(card.cost).map(([color, amount]) => {
                            if (amount === 0) return null;
                            const playerHas = player.tokens[color as GemColor] + (player.cards[color as GemColor] || 0);
                            const isEnough = playerHas >= amount;

                            return (
                                <div key={color} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg relative
                                    ${color === GemColor.White ? 'bg-white border-slate-300 text-black' : ''}
                                    ${color === GemColor.Blue ? 'bg-blue-600 border-blue-400 text-white' : ''}
                                    ${color === GemColor.Green ? 'bg-emerald-600 border-emerald-400 text-white' : ''}
                                    ${color === GemColor.Red ? 'bg-red-600 border-red-400 text-white' : ''}
                                    ${color === GemColor.Black ? 'bg-slate-800 border-slate-600 text-white' : ''}
                                `}>
                                    <span className="font-bold text-sm">{amount}</span>
                                    {/* Player status indicator */}
                                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-slate-900 flex items-center justify-center text-[8px]
                                        ${isEnough ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                                    `}>
                                        {isEnough ? '✓' : '×'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => {
                        onBuy(card);
                        onClose();
                    }}
                    disabled={!isTurn || !canAfford}
                    className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all
                        ${isTurn && canAfford
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 active:scale-95'
                            : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                        }
                    `}
                >
                    {!isTurn ? 'نوبت شما نیست' : canAfford ? 'خرید کارت' : 'منابع کافی نیست'}
                </button>

            </div>
        </div>
    );
};

export default ReservedCardModal;
