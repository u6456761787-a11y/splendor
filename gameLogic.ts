/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                         SPLENDOR - GAME LOGIC
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * قوانین کامل بازی Splendor:
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. خرید کارت (BUY CARD):
 * ═══════════════════════════════════════════════════════════════════════════
 *    
 *    هر کارت یک "هزینه" (cost) دارد که باید پرداخت شود.
 *    
 *    بازیکن دو نوع منبع دارد:
 *    - توکن (tokens): سکه‌هایی که خرج می‌شوند
 *    - bonus (cards): کارت‌های خریداری شده که تخفیف دائمی می‌دهند
 *    
 *    نحوه محاسبه:
 *    ─────────────────────────────────────────────────────────────────────────
 *    برای هر رنگ:
 *      هزینه_لازم = هزینه_کارت[رنگ] - bonus[رنگ]
 *      اگر هزینه_لازم < 0 باشد → هزینه_لازم = 0
 *      
 *      آیا می‌توان خرید؟ → توکن[رنگ] >= هزینه_لازم
 *    ─────────────────────────────────────────────────────────────────────────
 *    
 *    مثال:
 *    کارت هزینه: 4 قرمز
 *    بازیکن دارد: 2 bonus قرمز + 3 توکن قرمز
 *    هزینه لازم: 4 - 2 = 2 توکن قرمز
 *    نتیجه: ✅ می‌تواند بخرد (3 >= 2)
 *    
 * ═══════════════════════════════════════════════════════════════════════════
 * 2. برداشتن توکن (TAKE TOKENS):
 * ═══════════════════════════════════════════════════════════════════════════
 *    
 *    - 3 توکن از 3 رنگ مختلف
 *    - یا 2 توکن از یک رنگ (فقط اگر 4+ در بانک باشد)
 *    - حداکثر 10 توکن در دست
 *    
 * ═══════════════════════════════════════════════════════════════════════════
 * 3. رزرو کارت (RESERVE CARD):
 * ═══════════════════════════════════════════════════════════════════════════
 *    
 *    - حداکثر 3 کارت رزرو شده
 *    
 * ═══════════════════════════════════════════════════════════════════════════
 * 4. اشراف (NOBLES):
 * ═══════════════════════════════════════════════════════════════════════════
 *    
 *    - اشراف خودکار به بازیکن می‌آیند
 *    - شرط: داشتن تعداد مشخصی bonus از هر رنگ
 *    
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { GemColor, Card, Player, Cost, GameState, Noble } from './types';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * canAffordCard - بررسی امکان خرید کارت
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @param player - بازیکن
 * @param card - کارتی که می‌خواهد بخرد
 * @returns true اگر می‌تواند بخرد، false در غیر این صورت
 */
export function canAffordCard(player: Player, card: Card): boolean {
    // برای هر رنگ در هزینه کارت بررسی می‌کنیم
    const colors: GemColor[] = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black];

    // Debug: فقط اگر بازیکن انسان باشد لاگ بزن (برای جلوگیری از شلوغی کنسول توسط AI)
    const isHuman = player.id === 0;

    for (const color of colors) {
        // هزینه این رنگ برای کارت
        const cardCost: number = card.cost[color] ?? 0;

        // اگر این رنگ هزینه‌ای ندارد، رد شو
        if (cardCost === 0) continue;

        // bonus بازیکن از این رنگ (کارت‌های خریداری شده)
        const playerBonus: number = player.cards[color] ?? 0;

        // توکن بازیکن از این رنگ
        const playerTokens: number = player.tokens[color] ?? 0;

        // هزینه واقعی = هزینه کارت - bonus (حداقل 0)
        const actualCost: number = Math.max(0, cardCost - playerBonus);

        // آیا توکن کافی داریم؟
        if (playerTokens < actualCost) {
            if (isHuman) {
                console.log(`❌ Cannot afford card ${card.id}:`);
                console.log(`   Color: ${color}`);
                console.log(`   Cost: ${cardCost}`);
                console.log(`   Bonus: ${playerBonus}`);
                console.log(`   Tokens: ${playerTokens}`);
                console.log(`   Need (Tokens): ${actualCost}`);
                console.log(`   Missing: ${actualCost - playerTokens}`);
            }
            return false; // نمی‌توانیم بخریم
        }
    }

    return true; // همه شرایط برقرار است
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * payForCard - محاسبه توکن‌هایی که باید پرداخت شوند
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @param player - بازیکن
 * @param card - کارتی که می‌خرد
 * @returns آبجکت با تعداد توکن هر رنگ که باید پرداخت شود
 */
export function payForCard(player: Player, card: Card): { paidTokens: Cost } {
    const paidTokens: Cost = {};
    const colors: GemColor[] = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black];

    for (const color of colors) {
        // هزینه این رنگ برای کارت
        const cardCost: number = card.cost[color] ?? 0;

        // اگر این رنگ هزینه‌ای ندارد، رد شو
        if (cardCost === 0) continue;

        // bonus بازیکن از این رنگ
        const playerBonus: number = player.cards[color] ?? 0;

        // هزینه واقعی = هزینه کارت - bonus (حداقل 0)
        const actualCost: number = Math.max(0, cardCost - playerBonus);

        // فقط اگر باید توکن بدهیم
        if (actualCost > 0) {
            paidTokens[color] = actualCost;
        }
    }

    return { paidTokens };
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * checkNobles - بررسی آیا بازیکن شرایط اشراف را دارد
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @param player - بازیکن
 * @param nobles - لیست اشراف موجود
 * @returns اولین اشرافی که شرایطش را دارد، یا null
 */
export function checkNobles(player: Player, nobles: Noble[]): Noble | null {
    for (const noble of nobles) {
        let canGet = true;

        // بررسی همه شرایط این اشراف
        const colors: GemColor[] = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black];

        for (const color of colors) {
            const required: number = noble.requirements[color] ?? 0;
            const playerBonus: number = player.cards[color] ?? 0;

            if (playerBonus < required) {
                canGet = false;
                break;
            }
        }

        if (canGet) {
            return noble;
        }
    }

    return null;
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * calculateAIMove - منطق هوش مصنوعی
 * ═══════════════════════════════════════════════════════════════════════════
 */

type AIMove =
    | { type: 'buy'; card: Card; isReserved: boolean }
    | { type: 'reserve'; card: Card }
    | { type: 'take-tokens'; tokens: GemColor[] }
    | { type: 'pass' };

export function calculateAIMove(gameState: GameState): AIMove {
    const player = gameState.players[gameState.currentPlayerIndex];
    const visibleCards: Card[] = [
        ...gameState.visibleCards[1],
        ...gameState.visibleCards[2],
        ...gameState.visibleCards[3]
    ];

    // --- 1. بررسی اشراف (Nobles Strategy) ---
    // ببینیم کدام اشراف در دسترس هستند و ما چقدر به آنها نزدیکیم
    const availableNobles = gameState.nobles;
    const nobleTargetColors: { [key in GemColor]?: number } = {};

    availableNobles.forEach(noble => {
        Object.entries(noble.requirements).forEach(([color, count]) => {
            const gemColor = color as GemColor;
            const currentBonus = player.cards[gemColor] || 0;
            if (currentBonus < (count as number)) {
                // به این رنگ نیاز داریم تا به اشراف برسیم
                nobleTargetColors[gemColor] = (nobleTargetColors[gemColor] || 0) + 1;
            }
        });
    });

    // امتیاز دهی به کارت‌ها برای تصمیم‌گیری بهتر
    const scoreCard = (card: Card): number => {
        let score = card.points * 3; // امتیاز خود کارت خیلی مهم است

        // اگر این کارت ما را به اشراف نزدیک می‌کند
        if (nobleTargetColors[card.gemColor]) {
            score += 2;
        }

        // اگر کارت ارزان است (برای شروع بازی)
        const costAmount = Object.values(card.cost).reduce((a, b) => a + (b || 0), 0);
        if (costAmount < 4 && player.purchasedCards.length < 5) {
            score += 1.5;
        }

        return score;
    };

    // --- 2. تلاش برای خرید کارت (Buy Strategy) ---

    // الف) اول کارت‌های رزرو شده را چک کن
    const affordableReserved = player.reserved
        .filter(c => canAffordCard(player, c))
        .sort((a, b) => b.points - a.points); // اولویت با امتیاز بیشتر

    if (affordableReserved.length > 0) {
        return { type: 'buy', card: affordableReserved[0], isReserved: true };
    }

    // ب) کارت‌های روی زمین را چک کن
    const affordableVisible = visibleCards
        .filter(c => canAffordCard(player, c))
        .sort((a, b) => scoreCard(b) - scoreCard(a)); // مرتب‌سازی بر اساس امتیاز هوشمند

    if (affordableVisible.length > 0) {
        return { type: 'buy', card: affordableVisible[0], isReserved: false };
    }

    // --- 3. تلاش برای رزرو کارت (Reserve Strategy) ---
    // اگر توکن زیاد داریم (بیشتر از 8) و نمی‌توانیم بخریم، شاید بهتر است رزرو کنیم
    // یا اگر کارت خیلی خوبی هست که می‌خواهیم بعداً بخریم
    const totalTokens = Object.values(player.tokens).reduce((sum, count) => sum + count, 0);

    if (player.reserved.length < 3) {
        // کارت‌های ارزشمند که فعلاً نمی‌توانیم بخریم ولی نزدیکیم
        const targetCards = visibleCards
            .filter(c => !canAffordCard(player, c))
            .map(c => {
                const { paidTokens } = payForCard(player, c); // محاسبه هزینه باقیمانده (تقریبی)
                // اینجا payForCard فقط هزینه را برمی‌گرداند اگر بتوانیم بخریم، اما ما می‌خواهیم فاصله را بفهمیم.
                // پس دستی محاسبه می‌کنیم:
                let missingTokens = 0;
                Object.entries(c.cost).forEach(([color, cost]) => {
                    const gemColor = color as GemColor;
                    const needed = Math.max(0, (cost as number) - (player.cards[gemColor] || 0));
                    const have = player.tokens[gemColor] || 0;
                    if (have < needed) missingTokens += (needed - have);
                });
                return { card: c, missing: missingTokens, score: scoreCard(c) };
            })
            .filter(item => item.missing <= 3) // کارت‌هایی که حداکثر 3 توکن کم داریم
            .sort((a, b) => b.score - a.score);

        // اگر کارت خیلی خوبی پیدا کردیم و توکن کافی داریم (یا می‌خواهیم طلا بگیریم که اینجا نداریم)
        if (targetCards.length > 0 && Math.random() > 0.7) { // 30% شانس رزرو استراتژیک
            return { type: 'reserve', card: targetCards[0].card };
        }
    }

    // --- 4. برداشتن توکن (Take Tokens Strategy) ---
    // اگر نتوانستیم بخریم یا رزرو کنیم، باید توکن جمع کنیم.
    // اما نه تصادفی! بلکه توکن‌هایی که برای بهترین کارت موجود نیاز داریم.

    if (totalTokens < 10) {
        // بهترین کارتی که نمی‌توانیم بخریم را پیدا کن
        const bestTarget = visibleCards
            .sort((a, b) => scoreCard(b) - scoreCard(a))[0];

        if (bestTarget) {
            // محاسبه توکن‌های مورد نیاز برای این کارت
            const neededColors: GemColor[] = [];
            Object.entries(bestTarget.cost).forEach(([color, cost]) => {
                const gemColor = color as GemColor;
                const bonus = player.cards[gemColor] || 0;
                const currentTokens = player.tokens[gemColor] || 0;
                const needed = Math.max(0, (cost as number) - bonus);

                if (currentTokens < needed && gameState.bank[gemColor] > 0) {
                    neededColors.push(gemColor);
                }
            });

            // اگر رنگ‌های مورد نیاز را پیدا کردیم
            if (neededColors.length > 0) {
                // سعی کن 3 رنگ مختلف برداری که شامل رنگ‌های مورد نیاز باشد
                const tokensToTake = [...neededColors];

                // اگر کمتر از 3 تا بود، از رنگ‌های دیگر پر کن
                const otherColors = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black]
                    .filter(c => !tokensToTake.includes(c) && gameState.bank[c] > 0);

                while (tokensToTake.length < 3 && otherColors.length > 0) {
                    tokensToTake.push(otherColors.pop()!);
                }

                if (tokensToTake.length > 0) {
                    return { type: 'take-tokens', tokens: tokensToTake.slice(0, 3) };
                }
            }
        }

        // اگر هیچ هدف خاصی نداشتیم (عجیب است)، رندوم بردار
        const availableColors = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black]
            .filter(color => gameState.bank[color] > 0);

        if (availableColors.length >= 3) {
            const shuffled = [...availableColors].sort(() => Math.random() - 0.5);
            return { type: 'take-tokens', tokens: shuffled.slice(0, 3) };
        } else if (availableColors.length > 0) {
            return { type: 'take-tokens', tokens: availableColors };
        }
    }

    return { type: 'pass' };
}
