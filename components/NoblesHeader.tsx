import React from 'react';
import { Noble, GemColor } from '../types';

interface NoblesHeaderProps {
    nobles: Noble[];
}

const NoblesHeader: React.FC<NoblesHeaderProps> = ({ nobles }) => {
    return (
        <div className="flex gap-4 p-4 overflow-x-auto bg-slate-900/50 backdrop-blur-sm border-b border-white/10 shrink-0 h-32 items-center">
            <div className="flex items-center gap-2 text-yellow-500 font-bold shrink-0 ml-4">
                <span className="text-2xl">👑</span>
                <span className="hidden md:inline">اشراف</span>
            </div>

            {nobles.length === 0 ? (
                <div className="text-slate-500 text-sm italic">هیچ شریفی باقی نمانده</div>
            ) : (
                nobles.map(noble => (
                    <div
                        key={noble.id}
                        className="relative shrink-0 w-24 h-24 bg-slate-800 rounded-lg border-2 border-yellow-600/50 shadow-lg flex flex-col items-center justify-center gap-1 group hover:scale-105 transition-transform"
                    >
                        {/* Points */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border-2 border-yellow-500 flex items-center justify-center shadow-md z-10">
                            <span className="text-white font-serif font-bold">{noble.points}</span>
                        </div>

                        {/* Requirements */}
                        <div className="grid grid-cols-2 gap-1 p-2">
                            {Object.entries(noble.requirements).map(([color, count]) => (
                                <div
                                    key={color}
                                    className={`w-8 h-8 rounded flex items-center justify-center border shadow-inner ${color === GemColor.White ? 'bg-slate-200 border-slate-300 text-black' :
                                        color === GemColor.Blue ? 'bg-blue-700 border-blue-600 text-white' :
                                            color === GemColor.Green ? 'bg-emerald-700 border-emerald-600 text-white' :
                                                color === GemColor.Red ? 'bg-red-700 border-red-600 text-white' :
                                                    'bg-slate-700 border-slate-600 text-white'
                                        }`}
                                >
                                    <span className="text-sm font-bold">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NoblesHeader;
