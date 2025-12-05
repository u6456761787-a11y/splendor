import React, { useState } from 'react';

// حالت‌های بازی
export type GameMode = 'standard' | 'marathon';

interface MainMenuProps {
    onStartGame: (playerCount: number, gameMode: GameMode) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
    const [step, setStep] = useState<'main' | 'players' | 'mode'>('main');
    const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(2);

    const handlePlayerSelect = (count: number) => {
        setSelectedPlayerCount(count);
        setStep('mode'); // رفتن به صفحه انتخاب حالت بازی
    };

    const handleModeSelect = (mode: GameMode) => {
        onStartGame(selectedPlayerCount, mode);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/backgrounds/game-bg-luxury.png')" }}
        >
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-slate-950/30"></div>

            {/* Main Menu Card */}
            <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12 max-w-lg w-full mx-4">

                {/* Game Title */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2 font-serif">
                        اسپلندور
                    </h1>
                    <p className="text-slate-400 text-sm tracking-wider">SPLENDOR</p>
                </div>

                {/* Menu Options */}
                <div className="flex flex-col gap-4">

                    {/* === صفحه اصلی === */}
                    {step === 'main' && (
                        <>
                            {/* Play vs AI Button */}
                            <button
                                onClick={() => setStep('players')}
                                className="group relative bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-blue-500/50"
                            >
                                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative flex items-center justify-center gap-3">
                                    <span>🤖</span>
                                    <span>بازی با هوش مصنوعی</span>
                                </span>
                            </button>

                            {/* Future: Multiplayer Option */}
                            <button
                                disabled
                                className="bg-slate-800/50 text-slate-600 py-5 px-8 rounded-2xl font-bold text-xl border border-slate-700/50 cursor-not-allowed opacity-50"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <span>👥</span>
                                    <span>بازی چند نفره (به زودی)</span>
                                </span>
                            </button>
                        </>
                    )}

                    {/* === صفحه انتخاب تعداد بازیکنان === */}
                    {step === 'players' && (
                        <>
                            <div className="text-center text-white mb-2 font-bold">تعداد بازیکنان را انتخاب کنید:</div>

                            {/* 2 Players Button */}
                            <button
                                onClick={() => handlePlayerSelect(2)}
                                className="group relative bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-500/50"
                            >
                                <span className="relative flex items-center justify-center gap-3">
                                    <span>👤</span>
                                    <span>دو نفره (شما و ۱ هوش مصنوعی)</span>
                                </span>
                            </button>

                            {/* 4 Players Button */}
                            <button
                                onClick={() => handlePlayerSelect(4)}
                                className="group relative bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-500/50"
                            >
                                <span className="relative flex items-center justify-center gap-3">
                                    <span>👥</span>
                                    <span>چهار نفره (شما و ۳ هوش مصنوعی)</span>
                                </span>
                            </button>

                            {/* Back Button */}
                            <button
                                onClick={() => setStep('main')}
                                className="mt-2 text-slate-400 hover:text-white text-sm transition-colors"
                            >
                                بازگشت
                            </button>
                        </>
                    )}

                    {/* === صفحه انتخاب حالت بازی === */}
                    {step === 'mode' && (
                        <>
                            <div className="text-center text-white mb-2 font-bold">حالت بازی را انتخاب کنید:</div>

                            {/* Standard Mode - Play to 15 points */}
                            <button
                                onClick={() => handleModeSelect('standard')}
                                className="group relative bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-500/50"
                            >
                                <span className="relative flex flex-col items-center justify-center gap-1">
                                    <span className="flex items-center gap-2">
                                        <span>🏆</span>
                                        <span>بازی تا ۱۵ امتیاز</span>
                                    </span>
                                    <span className="text-xs text-amber-200 opacity-80">اولین نفر به ۱۵ امتیاز برنده است</span>
                                </span>
                            </button>

                            {/* Marathon Mode - Play until all cards are bought */}
                            <button
                                onClick={() => handleModeSelect('marathon')}
                                className="group relative bg-gradient-to-br from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-rose-500/50"
                            >
                                <span className="relative flex flex-col items-center justify-center gap-1">
                                    <span className="flex items-center gap-2">
                                        <span>🃏</span>
                                        <span>بازی تا آخرین کارت</span>
                                    </span>
                                    <span className="text-xs text-rose-200 opacity-80">تا وقتی کارتی نمانده، بیشترین امتیاز برنده است</span>
                                </span>
                            </button>

                            {/* Back Button */}
                            <button
                                onClick={() => setStep('players')}
                                className="mt-2 text-slate-400 hover:text-white text-sm transition-colors"
                            >
                                بازگشت
                            </button>
                        </>
                    )}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-slate-500 text-xs">
                    <p>نسخه 1.1.0</p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
    );
};

export default MainMenu;
