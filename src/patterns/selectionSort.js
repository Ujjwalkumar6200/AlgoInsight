export const selectionSort = (arr) => {
  const steps = [];
  const array = [...arr];

  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        highlighted: [i, j],
        pointers: { i, j }
      });
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    // Swap
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
    steps.push({
      array: [...array],
      highlighted: [i, minIdx],
      pointers: { i, minIdx }
    });
  }

  return steps;
};
