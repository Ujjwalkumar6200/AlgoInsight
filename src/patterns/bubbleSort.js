export const bubbleSort = (arr) => {
  const steps = [];
  const array = [...arr];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        array: [...array],
        highlighted: [j, j + 1],
        pointers: { j, j1: j + 1 }
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          highlighted: [j, j + 1],
          pointers: { j, j1: j + 1 }
        });
      }
    }
  }

  return steps;
};
