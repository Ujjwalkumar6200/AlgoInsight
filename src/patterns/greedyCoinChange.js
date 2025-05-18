export function greedyCoinChangeSteps(coins, amount) {
  const steps = [];
  coins = [...coins].sort((a, b) => b - a); // Sort descending, copy to avoid side effects
  let remaining = amount;
  const usedCoins = [];
  
  steps.push({
    coins: [...coins],
    amount,
    description: "Starting greedy coin change",
    currentTarget: remaining,
    usedCoins: [],
    type: "initial"
  });

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    steps.push({
      coins: [...coins],
      currentCoin: coin,
      currentTarget: remaining,
      usedCoins: [...usedCoins],
      description: `Checking coin ${coin}`,
      type: "check-coin"
    });

    while (remaining >= coin) {
      usedCoins.push(coin);
      remaining -= coin;
      steps.push({
        coins: [...coins],
        currentCoin: coin,
        currentTarget: remaining,
        usedCoins: [...usedCoins],
        description: `Using coin ${coin}, remaining: ${remaining}`,
        type: "use-coin"
      });
    }

    if (remaining === 0) break;
  }

  steps.push({
    coins: [...coins],
    amount,
    currentTarget: remaining,
    usedCoins: [...usedCoins],
    description: remaining === 0 ? 
      "Successfully made change" : 
      "Could not make exact change with given coins",
    type: "result"
  });

  return steps;
}

// Example standalone usage:
const coins = [1, 5, 10, 25];
const amount = 63;
console.log(greedyCoinChangeSteps(coins, amount));
