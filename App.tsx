
import React, { useState, useEffect } from 'react';
import { GameState, Player, Card, GemColor } from './types';
import { INITIAL_DECKS, NOBLES, INITIAL_BANK_4_PLAYERS, INITIAL_BANK_2_PLAYERS } from './constants';
import { canAffordCard, payForCard, checkNobles, calculateAIMove } from './gameLogic';

// Mobile Components
import MobileHeader from './components/MobileHeader';
import TierCardsGrid from './components/TierCardsGrid';
import TokenAcquisitionBox from './components/TokenAcquisitionBox';
import NoblesModal from './components/NoblesModal';
import OpponentsModal from './components/OpponentsModal';
import PlayerFooter from './components/PlayerFooter';
import MainMenu, { GameMode } from './components/MainMenu';

// New Components
import ReservedCardModal from './components/ReservedCardModal';
import NoblesHeader from './components/NoblesHeader';
import PlayerSidebar from './components/PlayerSidebar';
import NoblesSidebar from './components/NoblesSidebar';


const WINNING_SCORE = 15;

const App: React.FC = () => {
    const [appMode, setAppMode] = useState<'menu' | 'playing'>('menu');
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [selectedTokens, setSelectedTokens] = useState<GemColor[]>([]);
    const [notification, setNotification] = useState<string>('');
    const [selectedGameMode, setSelectedGameMode] = useState<GameMode>('standard');

    // Mobile UI State
    const [isTokenSheetOpen, setIsTokenSheetOpen] = useState(false);
    const [isNoblesOpen, setIsNoblesOpen] = useState(false);
    const [isOpponentsOpen, setIsOpponentsOpen] = useState(false);
    const [selectedReservedCard, setSelectedReservedCard] = useState<Card | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Initialize Game (only when starting from menu)
    const initGame = (playerCount: number, gameMode: GameMode) => {
        setSelectedGameMode(gameMode);
        const players: Player[] = [
            { id: 0, name: 'شما', tokens: { White: 0, Blue: 0, Green: 0, Red: 0, Black: 0 }, cards: { White: 0, Blue: 0, Green: 0, Red: 0, Black: 0 }, purchasedCards: [], reserved: [], nobles: [], score: 0 }
        ];

        // Add AI Players
        for (let i = 1; i < playerCount; i++) {
            players.push({
                id: i,
                name: `AI ${i}`,
                isAI: true,
                tokens: { White: 0, Blue: 0, Green: 0, Red: 0, Black: 0 },
                cards: { White: 0, Blue: 0, Green: 0, Red: 0, Black: 0 },
                purchasedCards: [],
                reserved: [],
                nobles: [],
                score: 0
            });
        }

        const decks = JSON.parse(JSON.stringify(INITIAL_DECKS));
        const visibleCards: GameState['visibleCards'] = { 1: [], 2: [], 3: [] };

        ([1, 2, 3] as const).forEach(tier => {
            for (let i = 0; i < 4; i++) {
                if (decks[tier].length > 0) visibleCards[tier].push(decks[tier].pop()!);
            }
        });

        const shuffledNobles = [...NOBLES].sort(() => 0.5 - Math.random()).slice(0, playerCount + 1);

        setGameState({
            players,
            currentPlayerIndex: 0,
            bank: playerCount === 2 ? { ...INITIAL_BANK_2_PLAYERS } : { ...INITIAL_BANK_4_PLAYERS },
            decks,
            visibleCards,
            nobles: shuffledNobles,
            winner: null,
            turn: 1,
            log: ['بازی شروع شد!']
        });
        setAppMode('playing');
    };

    // AI Turn Handling
    useEffect(() => {
        if (!gameState || gameState.winner !== null) return;

        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        if (currentPlayer.isAI) {
            const timer = setTimeout(() => {
                const move = calculateAIMove(gameState);
                handleAIMove(move);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [gameState?.currentPlayerIndex, gameState?.turn]);

    const handleAIMove = async (move: any) => {
        if (move.type === 'take-tokens') {
            // 1. Open Sheet
            setIsTokenSheetOpen(true);

            // 2. Select Tokens with Delay
            const tokens = move.tokens as GemColor[];
            for (let i = 0; i < tokens.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 600)); // Wait before picking next
                setSelectedTokens(prev => [...prev, tokens[i]]);
            }

            // 3. Wait a bit then Confirm
            await new Promise(resolve => setTimeout(resolve, 800));
            processTakeTokens(tokens);

            // 4. Close and Reset
            setIsTokenSheetOpen(false);
            setSelectedTokens([]);

        } else if (move.type === 'buy') {
            processBuyCard(move.card, move.isReserved);
        } else if (move.type === 'reserve') {
            processReserveCard(move.card);
        } else {
            nextTurn();
        }
    };

    const notify = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(''), 3000);
    };

    const processTakeTokens = (tokensToTake: GemColor[]) => {
        if (!gameState || isProcessing) return;
        setIsProcessing(true);

        setGameState(prev => {
            if (!prev) return null;
            const newBank = { ...prev.bank };
            const newPlayers = [...prev.players];
            const player = { ...newPlayers[prev.currentPlayerIndex] };
            player.tokens = { ...player.tokens }; // Deep copy to avoid mutation

            tokensToTake.forEach(t => {
                newBank[t]--;
                player.tokens[t] = (player.tokens[t] || 0) + 1;
            });

            newPlayers[prev.currentPlayerIndex] = player;
            return {
                ...prev,
                bank: newBank,
                players: newPlayers,
                log: [`${player.name} tokens گرفت: ${tokensToTake.join(', ')}`, ...prev.log]
            };
        });
        setSelectedTokens([]);
        setIsTokenSheetOpen(false);
        setIsProcessing(false);
        isProcessingRef.current = false;
        nextTurn();
    };

    const processBuyCard = (card: Card, isReserved: boolean) => {
        setGameState(prev => {
            if (!prev) return null;
            const newPlayers = [...prev.players];
            const player = { ...newPlayers[prev.currentPlayerIndex] };
            // Deep copy all nested objects to avoid mutation
            player.tokens = { ...player.tokens };
            player.cards = { ...player.cards };
            player.purchasedCards = [...player.purchasedCards];
            player.reserved = [...player.reserved];
            player.nobles = [...player.nobles];

            const { paidTokens } = payForCard(player, card);
            const newBank = { ...prev.bank };

            Object.entries(paidTokens).forEach(([color, amount]) => {
                if (amount) {
                    const amountNum = amount as number;
                    player.tokens[color as GemColor] -= amountNum;
                    newBank[color as GemColor] += amountNum;
                }
            });

            player.cards[card.gemColor]++;
            player.purchasedCards.push(card);
            player.score += card.points;

            let newVisibleCards = { ...prev.visibleCards };
            if (isReserved) {
                player.reserved = player.reserved.filter(c => c.id !== card.id);
            } else {
                const tier = card.tier;
                newVisibleCards[tier] = newVisibleCards[tier].filter(c => c.id !== card.id);
                if (prev.decks[tier].length > 0) {
                    const newCard = prev.decks[tier][prev.decks[tier].length - 1];
                    const newDeck = prev.decks[tier].slice(0, -1);
                    newVisibleCards[tier].push(newCard);
                }
            }

            let newNobles = [...prev.nobles];
            const earnedNoble = checkNobles(player, newNobles);
            if (earnedNoble) {
                player.nobles.push(earnedNoble);
                player.score += earnedNoble.points;
                newNobles = newNobles.filter(n => n.id !== earnedNoble.id);
            }

            newPlayers[prev.currentPlayerIndex] = player;

            const newDecks = { ...prev.decks };
            if (!isReserved) {
                if (newDecks[card.tier].length > 0) {
                    newDecks[card.tier] = newDecks[card.tier].slice(0, -1);
                }
            }

            return {
                ...prev,
                players: newPlayers,
                bank: newBank,
                visibleCards: newVisibleCards,
                decks: newDecks,
                nobles: newNobles,
                log: [`${player.name} کارت ${card.gemColor} (${card.points} امتیاز) خرید`, ...prev.log]
            };
        });
        nextTurn();
    };

    const processReserveCard = (card: Card) => {
        setGameState(prev => {
            if (!prev) return null;
            const newPlayers = [...prev.players];
            const player = { ...newPlayers[prev.currentPlayerIndex] };
            // Deep copy nested objects
            player.reserved = [...player.reserved];
            player.tokens = { ...player.tokens };
            const newBank = { ...prev.bank };

            player.reserved.push(card);

            let newVisibleCards = { ...prev.visibleCards };
            const tier = card.tier;
            newVisibleCards[tier] = newVisibleCards[tier].filter(c => c.id !== card.id);

            const newDecks = { ...prev.decks };
            if (newDecks[tier].length > 0) {
                const newCard = newDecks[tier][newDecks[tier].length - 1];
                newDecks[tier] = newDecks[tier].slice(0, -1);
                newVisibleCards[tier].push(newCard);
            }

            newPlayers[prev.currentPlayerIndex] = player;

            return {
                ...prev,
                players: newPlayers,
                bank: newBank,
                visibleCards: newVisibleCards,
                decks: newDecks,
                log: [`${player.name} کارت را رزرو کرد`, ...prev.log]
            };
        });
        nextTurn();
    };

    const handleTokenClick = (color: GemColor) => {
        if (!gameState || gameState.currentPlayerIndex !== 0) return;
        if (gameState.bank[color] <= 0) {
            notify("این توکن در بانک موجود نیست.");
            return;
        }

        const countSelected = selectedTokens.filter(c => c === color).length;

        // Case 1: This color is selected twice - remove one instance
        if (countSelected === 2) {
            const newSel = [...selectedTokens];
            const index = newSel.indexOf(color);
            newSel.splice(index, 1);
            setSelectedTokens(newSel);
            return;
        }

        // Case 2: This color is selected once
        if (countSelected === 1) {
            // If it's the ONLY token selected, try to upgrade to 2
            if (selectedTokens.length === 1) {
                if (gameState.bank[color] >= 4) {
                    setSelectedTokens([color, color]);
                } else {
                    notify("برای برداشتن ۲ توکن همرنگ، باید حداقل ۴ عدد در بانک باشد.");
                }
            } else {
                // Otherwise, remove this token from selection
                setSelectedTokens(selectedTokens.filter(c => c !== color));
            }
            return;
        }

        // Case 3: This color is NOT selected - add it
        // Check if we already have 2 of the same color selected
        if (selectedTokens.length === 2 && selectedTokens[0] === selectedTokens[1]) {
            notify("نمی‌توانید ۲ توکن همرنگ را با توکن دیگر ترکیب کنید.");
            return;
        }

        // Check if we already have 3 tokens
        if (selectedTokens.length >= 3) {
            notify("حداکثر ۳ توکن می‌توانید بردارید.");
            return;
        }

        // Add this token
        setSelectedTokens([...selectedTokens, color]);
    };

    const isProcessingRef = React.useRef(false);

    const handleConfirmTokens = () => {
        if (selectedTokens.length === 0 || isProcessing || isProcessingRef.current) return;

        isProcessingRef.current = true;

        if (selectedTokens.length === 2 && selectedTokens[0] === selectedTokens[1]) {
            if (gameState!.bank[selectedTokens[0]] < 4) {
                notify("برای برداشتن ۲ توکن همرنگ، باید حداقل ۴ عدد در بانک باشد.");
                isProcessingRef.current = false;
                return;
            }
        }

        processTakeTokens(selectedTokens);
    };

    const handleBuyCard = (card: Card, isReserved: boolean = false) => {
        if (!gameState || gameState.currentPlayerIndex !== 0) return;
        if (!canAffordCard(gameState.players[0], card)) {
            notify("منابع کافی ندارید!");
            return;
        }
        processBuyCard(card, isReserved);
    };

    const handleReserveCard = (card: Card) => {
        if (!gameState || gameState.currentPlayerIndex !== 0) return;
        if (gameState.players[0].reserved.length >= 3) {
            notify("حداکثر ۳ کارت می‌توانید رزرو کنید.");
            return;
        }
        processReserveCard(card);
    };

    const nextTurn = () => {
        setGameState(prev => {
            if (!prev) return null;

            const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
            const isEndOfRound = nextIndex === 0;

            // تعداد کارت‌های باقیمانده
            const totalVisibleCards =
                prev.visibleCards[1].length +
                prev.visibleCards[2].length +
                prev.visibleCards[3].length;
            const totalDeckCards =
                prev.decks[1].length +
                prev.decks[2].length +
                prev.decks[3].length;
            const allCardsGone = totalVisibleCards === 0 && totalDeckCards === 0;

            // === حالت استاندارد: بازی تا 15 امتیاز ===
            if (selectedGameMode === 'standard') {
                const playersWith15Plus = prev.players.filter(p => p.score >= WINNING_SCORE);

                if (playersWith15Plus.length > 0 && isEndOfRound) {
                    const sortedPlayers = [...prev.players].sort((a, b) => {
                        if (b.score !== a.score) return b.score - a.score;
                        return a.purchasedCards.length - b.purchasedCards.length;
                    });
                    return { ...prev, winner: sortedPlayers[0].id };
                }
            }

            // === حالت ماراتن: بازی تا آخرین کارت ===
            if (selectedGameMode === 'marathon') {
                if (allCardsGone && isEndOfRound) {
                    const sortedPlayers = [...prev.players].sort((a, b) => {
                        if (b.score !== a.score) return b.score - a.score;
                        return a.purchasedCards.length - b.purchasedCards.length;
                    });
                    return { ...prev, winner: sortedPlayers[0].id };
                }
            }

            // اگر در حالت استاندارد کارت تمام شد، بازی تمام می‌شود
            // قانون جدید: اگر هیچ کارتی روی زمین نمانده باشد، بازی تمام است
            if (totalVisibleCards === 0) {
                const sortedPlayers = [...prev.players].sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return a.purchasedCards.length - b.purchasedCards.length;
                });
                return { ...prev, winner: sortedPlayers[0].id };
            }

            return {
                ...prev,
                currentPlayerIndex: nextIndex,
                turn: isEndOfRound ? prev.turn + 1 : prev.turn
            };
        });
    };

    // Show menu if in menu mode
    if (appMode === 'menu') {
        return <MainMenu onStartGame={initGame} />;
    }

    // Show loading if game is starting
    if (!gameState) {
        return <div className="flex h-screen items-center justify-center bg-slate-900 text-white">در حال بارگذاری...</div>;
    }

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const isTurn = gameState.currentPlayerIndex === 0;
    const humanPlayer = gameState.players[0];



    // ... (existing imports)

    // ... (inside App component)


    // محاسبه تعداد کل کارت‌های باقیمانده برای قانون محدودیت رزرو
    const totalRemainingCards =
        gameState.visibleCards[1].length + gameState.visibleCards[2].length + gameState.visibleCards[3].length +
        gameState.decks[1].length + gameState.decks[2].length + gameState.decks[3].length;

    // قانون: اگر 7 کارت یا کمتر مانده، رزرو ممنوع است
    const canReserveGlobal = totalRemainingCards > 7;

    return (
        <div className="flex flex-col h-screen bg-slate-950 font-sans select-none" dir="rtl">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: "url('/assets/backgrounds/game-bg-luxury.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none"></div>

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">

                {/* Top Header: Opponents + My Score - Moved to top level for full width */}
                <MobileHeader
                    currentPlayer={currentPlayer}
                    turn={gameState.turn}
                    noblesCount={gameState.nobles.length}
                    onNoblesClick={() => setIsNoblesOpen(true)}
                    onOpponentsClick={() => setIsOpponentsOpen(true)}
                    opponents={gameState.players.filter(p => p.id !== 0)}
                    currentPlayerIndex={gameState.currentPlayerIndex}
                />

                {/* Middle Area: Game Content + Sidebar */}
                <div className="flex-1 flex flex-row overflow-hidden">

                    {/* Main Content Area (Right side in RTL) */}
                    <div className="flex-1 flex flex-col h-full relative overflow-hidden">

                        {/* All Cards Grid - No Scroll */}
                        <div className="flex-1 overflow-hidden px-0 relative flex flex-col justify-center">

                            {/* Tier 3 */}
                            <TierCardsGrid
                                tier={3}
                                cards={gameState.visibleCards[3]}
                                deckCount={gameState.decks[3].length}
                                canBuy={(card) => canAffordCard(humanPlayer, card)}
                                canReserve={canReserveGlobal}
                                onBuy={handleBuyCard}
                                onReserve={handleReserveCard}
                                disabled={!isTurn || isProcessing}
                            />

                            {/* Tier 2 */}
                            <TierCardsGrid
                                tier={2}
                                cards={gameState.visibleCards[2]}
                                deckCount={gameState.decks[2].length}
                                canBuy={(card) => canAffordCard(humanPlayer, card)}
                                canReserve={canReserveGlobal}
                                onBuy={handleBuyCard}
                                onReserve={handleReserveCard}
                                disabled={!isTurn || isProcessing}
                            />

                            {/* Tier 1 */}
                            <TierCardsGrid
                                tier={1}
                                cards={gameState.visibleCards[1]}
                                deckCount={gameState.decks[1].length}
                                canBuy={(card) => canAffordCard(humanPlayer, card)}
                                canReserve={canReserveGlobal}
                                onBuy={handleBuyCard}
                                onReserve={handleReserveCard}
                                disabled={!isTurn || isProcessing}
                            />



                            {/* Modals */}
                            <NoblesModal
                                isOpen={isNoblesOpen}
                                onClose={() => setIsNoblesOpen(false)}
                                nobles={gameState.nobles}
                            />

                            <OpponentsModal
                                isOpen={isOpponentsOpen}
                                onClose={() => setIsOpponentsOpen(false)}
                                opponents={gameState.players.filter(p => p.id !== 0)}
                                currentPlayerIndex={gameState.currentPlayerIndex}
                            />

                            {/* Notification Toast */}
                            {notification && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 border border-red-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-bounce font-bold backdrop-blur-md">
                                    {notification}
                                </div>
                            )}

                            {/* Winner Overlay */}
                            {gameState.winner !== null && (
                                <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-slate-900 p-8 rounded-2xl border border-yellow-500/50 shadow-2xl text-center max-w-md">
                                        <h2 className="text-4xl font-bold text-yellow-500 mb-4 font-serif">بازی تمام شد!</h2>
                                        <p className="text-2xl text-white mb-6">
                                            برنده: {gameState.players.find(p => p.id === gameState.winner)?.name}
                                        </p>
                                        <p className="text-slate-400 mb-8">با {gameState.players.find(p => p.id === gameState.winner)?.score} امتیاز</p>
                                        <button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105">
                                            بازی دوباره
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Sidebar: Nobles (Last child in RTL = Left) */}
                    <NoblesSidebar nobles={gameState.nobles} />
                </div>

                {/* Token Acquisition Box - Positioned above footer, left of nobles */}
                <div className="flex justify-start mb-2" style={{ paddingLeft: '150px', paddingRight: '83px' }}>
                    <TokenAcquisitionBox
                        bank={gameState.bank}
                        selectedTokens={selectedTokens}
                        onTokenClick={handleTokenClick}
                        onConfirmTokens={handleConfirmTokens}
                        isTurn={isTurn}
                    />
                </div>

                {/* Player Footer - Full Width at Bottom */}
                <PlayerFooter
                    player={humanPlayer}
                    reservedCards={humanPlayer.reserved}
                    onBuyReserved={(card) => setSelectedReservedCard(card)}
                    canAffordCard={(card) => canAffordCard(humanPlayer, card)}
                    isTurn={isTurn}
                />

                {/* Reserved Card Modal */}
                <ReservedCardModal
                    isOpen={!!selectedReservedCard}
                    onClose={() => setSelectedReservedCard(null)}
                    card={selectedReservedCard}
                    player={humanPlayer}
                    onBuy={(card) => handleBuyCard(card, true)}
                    isTurn={isTurn}
                />
            </div>
        </div>
    );
};

export default App;
