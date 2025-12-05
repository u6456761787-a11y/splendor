
import React, { useState } from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface CardCarouselProps {
    cards: Card[];
    canBuy: (card: Card) => boolean;
    canReserve: boolean;
    onBuy: (card: Card) => void;
    onReserve: (card: Card) => void;
    disabled: boolean;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
    cards,
    canBuy,
    canReserve,
    onBuy,
    onReserve,
    disabled
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0));
    };

    if (cards.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-500">
                کارتی موجود نیست
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    return (
        <div className="flex flex-col items-center gap-4 py-4">
            {/* Card Display */}
            <div className="relative flex items-center justify-center gap-4 w-full">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-white active:scale-95 transition-all shrink-0"
                    disabled={cards.length <= 1}
                >
                    ‹
                </button>

                {/* Card */}
                <div className="flex items-center justify-center" style={{ width: '200px', height: '280px' }}>
                    <div className="transform scale-150 origin-center">
                        <CardComponent
                            card={currentCard}
                            canBuy={!disabled && canBuy(currentCard)}
                            canReserve={!disabled && canReserve}
                            onBuy={() => onBuy(currentCard)}
                            onReserve={() => onReserve(currentCard)}
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-white active:scale-95 transition-all shrink-0"
                    disabled={cards.length <= 1}
                >
                    ›
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-6 bg-blue-500'
                                : 'w-2 bg-slate-600 hover:bg-slate-500'
                            }`}
                    />
                ))}
            </div>

            {/* Action Buttons */}
            {!disabled && (
                <div className="flex gap-3 w-full px-4">
                    <button
                        onClick={() => onBuy(currentCard)}
                        disabled={!canBuy(currentCard)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-lg font-bold shadow-lg transition-all active:scale-95"
                    >
                        خرید کارت
                    </button>
                    <button
                        onClick={() => onReserve(currentCard)}
                        disabled={!canReserve}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-lg font-bold shadow-lg transition-all active:scale-95"
                    >
                        رزرو کارت
                    </button>
                </div>
            )}

            {/* Card Counter */}
            <div className="text-xs text-slate-500 font-mono">
                {currentIndex + 1} از {cards.length}
            </div>
        </div>
    );
};

export default CardCarousel;
