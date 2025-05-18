// patterns/fastSlowPointer.js
export const fastSlowPointerSteps = (array, hasCycle = false) => {
  const steps = [];
  let slow = 0;
  let fast = 0;
  
  // For cycle detection, we'll treat the array as a linked list where each value points to the next index
  const getNextIndex = (index) => {
    if (index < 0 || index >= array.length) return -1;
    return array[index];
  };

  // Initial state
  steps.push({
    array: [...array],
    slow,
    fast,
    description: "Initialize slow and fast pointers at the start",
    hasCycle: false
  });

  if (hasCycle) {
    // Cycle detection implementation
    while (fast !== -1 && getNextIndex(fast) !== -1) {
      const nextSlow = getNextIndex(slow);
      const nextFast = getNextIndex(getNextIndex(fast));
      
      if (nextSlow === -1 || nextFast === -1) break;
      
      steps.push({
        array: [...array],
        slow: nextSlow,
        fast: nextFast,
        description: `Moved slow to ${nextSlow}, fast to ${nextFast}`
      });

      if (nextSlow === nextFast) {
        steps.push({
          array: [...array],
          slow: nextSlow,
          fast: nextFast,
          description: "Cycle detected! Pointers have met",
          hasCycle: true
        });
        return steps;
      }

      slow = nextSlow;
      fast = nextFast;
    }
  } else {
    // Middle finding implementation (original code)
    while (fast < array.length && fast + 1 < array.length) {
      slow++;
      fast += 2;
      steps.push({
        array: [...array],
        slow,
        fast,
        description: `Moved slow to ${slow}, fast to ${fast}`
      });
    }
  }

  // Final state
  steps.push({
    array: [...array],
    slow,
    fast,
    description: hasCycle ? "No cycle detected" : `Fast pointer reached end. Middle is at ${slow}`,
    hasCycle: false
  });

  return steps;
};

export default fastSlowPointerSteps;