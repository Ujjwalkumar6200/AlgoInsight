export const mergeSortSteps = (array) => {
  const steps = [];
  const arr = [...array];

  const merge = (start, mid, end) => {
    let merged = [];
    let left = start;
    let right = mid + 1;

    while (left <= mid && right <= end) {
      steps.push({
        array: [...arr],
        highlighted: [left, right],
        pointers: { left, right }
      });

      if (arr[left] < arr[right]) {
        merged.push(arr[left++]);
      } else {
        merged.push(arr[right++]);
      }
    }

    while (left <= mid) {
      steps.push({
        array: [...arr],
        highlighted: [left],
        pointers: { left }
      });
      merged.push(arr[left++]);
    }

    while (right <= end) {
      steps.push({
        array: [...arr],
        highlighted: [right],
        pointers: { right }
      });
      merged.push(arr[right++]);
    }

    for (let i = 0; i < merged.length; i++) {
      arr[start + i] = merged[i];
      steps.push({
        array: [...arr],
        highlighted: [start + i],
        pointers: {}
      });
    }
  };

  const mergeSort = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  };

  mergeSort(0, arr.length - 1);
  return steps;
};
