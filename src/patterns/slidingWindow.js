export function slidingWindow(array, windowSize) {
  const steps = [];
  let maxSum = 0;
  let windowSum = 0;
  let start = 0;

  for (let end = 0; end < array.length; end++) {
    windowSum += array[end];

    if (end >= windowSize - 1) {
      maxSum = Math.max(maxSum, windowSum);
      steps.push({
        start,
        end,
        maxSum,
        highlighted: Array.from({ length: windowSize }, (_, i) => start + i),
      });
      windowSum -= array[start];
      start++;
    }
  }

  return steps;
}
