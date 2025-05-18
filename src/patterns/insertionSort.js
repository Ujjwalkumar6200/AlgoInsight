export const insertionSort = (arr) => {
  const steps = [];
  const array = [...arr];

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      highlighted: [i],
      pointers: { i, key }
    });

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      steps.push({
        array: [...array],
        highlighted: [j, j + 1],
        pointers: { j, i }
      });
      j--;
    }

    array[j + 1] = key;
    steps.push({
      array: [...array],
      highlighted: [j + 1],
      pointers: { insert: j + 1 }
    });
  }

  return steps;
};
