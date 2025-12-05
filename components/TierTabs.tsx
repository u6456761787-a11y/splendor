
import React from 'react';

interface TierTabsProps {
    selectedTier: 1 | 2 | 3;
    onTierChange: (tier: 1 | 2 | 3) => void;
    deckCounts: { 1: number; 2: number; 3: number };
}

const TierTabs: React.FC<TierTabsProps> = ({ selectedTier, onTierChange, deckCounts }) => {
    const tiers: Array<1 | 2 | 3> = [1, 2, 3];

    const tierColors = {
        1: 'border-green-500/60 bg-green-500/10 text-green-400',
        2: 'border-yellow-500/60 bg-yellow-500/10 text-yellow-400',
        3: 'border-blue-500/60 bg-blue-500/10 text-blue-400',
    };

    const tierLabels = {
        1: 'سطح I',
        2: 'سطح II',
        3: 'سطح III',
    };

    return (
        <div className="h-12 bg-slate-900/50 border-b border-slate-800 flex items-center justify-center gap-2 px-4 shrink-0">
            {tiers.map(tier => (
                <button
                    key={tier}
                    onClick={() => onTierChange(tier)}
                    className={`flex-1 h-9 rounded-lg border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${selectedTier === tier
                            ? tierColors[tier] + ' shadow-lg'
                            : 'border-slate-700 bg-slate-800/50 text-slate-500 hover:bg-slate-800'
                        }`}
                >
                    <span>{tierLabels[tier]}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${selectedTier === tier ? 'bg-slate-900' : 'bg-slate-700'
                        }`}>
                        {deckCounts[tier]}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default TierTabs;
