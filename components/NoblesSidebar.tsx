import React from 'react';
import { Noble, GemColor } from '../types';

interface NoblesSidebarProps {
    nobles: Noble[];
}

const NoblesSidebar: React.FC<NoblesSidebarProps> = ({ nobles }) => {
    return (
        <div className="w-[83px] border-r border-yellow-600/30 flex flex-col items-center justify-between py-2 h-full shrink-0 z-10 shadow-2xl">
            {/* Nobles List - Fixed 5 items */}
            <div className="flex-1 flex flex-col items-center justify-between w-full px-1 overflow-hidden">
                {nobles.length === 0 ? (
                    <div className="text-slate-600 text-[10px] text-center italic rotate-90 whitespace-nowrap mt-10">
                        پایان اشراف
                    </div>
                ) : (
                    nobles.map(noble => (
                        <div
                            key={noble.id}
                            className="relative w-[98%] aspect-square rounded-lg border border-yellow-600/50 shadow-md flex flex-col items-center justify-center group hover:scale-105 transition-transform shrink-0 overflow-hidden"
                            style={{
                                backgroundImage: noble.img ? `url(${noble.img})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: '#1e293b'
                            }}
                        >

                            {/* Requirements - Vertical List on Right */}
                            <div className="absolute top-1 right-1 flex flex-col gap-0.5 z-10">
                                {Object.entries(noble.requirements).map(([color, count]) => {
                                    if (!count) return null;
                                    return (
                                        <div key={color} className={`w-5 h-5 rounded shadow-md border border-white/20 flex items-center justify-center text-[10px] font-bold leading-none
                                            ${color === GemColor.White ? 'bg-slate-100 text-black' : ''}
                                            ${color === GemColor.Blue ? 'bg-blue-700 text-white' : ''}
                                            ${color === GemColor.Green ? 'bg-emerald-700 text-white' : ''}
                                            ${color === GemColor.Red ? 'bg-red-700 text-white' : ''}
                                            ${color === GemColor.Black ? 'bg-slate-800 text-white' : ''}
                                        `}>
                                            {count}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Points Badge - Left Side */}
                            <div className="absolute bottom-1 left-1 w-[31px] h-[31px] rounded-full bg-yellow-500 border-2 border-slate-900 flex items-center justify-center shadow-lg z-10">
                                <span className="text-slate-900 font-serif font-bold text-sm">{noble.points}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NoblesSidebar;
