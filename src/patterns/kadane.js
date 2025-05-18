export const kadaneSteps = (array) => {
  let steps = [];
  let maxSoFar = array[0];
  let maxEndingHere = array[0];
  let start = 0, end = 0, s = 0;
  
  steps.push({ array: [...array], highlighted: [start], maxEndingHere });

  for (let i = 1; i < array.length; i++) {
    if (maxEndingHere + array[i] < array[i]) {
      maxEndingHere = array[i];
      s = i;
    } else {
      maxEndingHere += array[i];
    }

    if (maxSoFar < maxEndingHere) {
      maxSoFar = maxEndingHere;
      start = s;
      end = i;
    }

    steps.push({
      array: [...array],
      highlighted: [start, end],
      maxEndingHere,
      left: start,
      right: end
    });
  }

  return steps;
};
