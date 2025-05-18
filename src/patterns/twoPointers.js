export function twoPointers(array, target) {
  const steps = [];
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    const sum = array[left] + array[right];
    steps.push({
      left,
      right,
      sum,
      highlighted: [left, right],
    });

    if (sum === target) {
      break;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return steps;
}
