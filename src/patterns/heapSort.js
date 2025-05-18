export function heapSortSteps(arr) {
  const steps = [];
  const a = [...arr];

  const swap = (i, j) => {
    [a[i], a[j]] = [a[j], a[i]];
    steps.push({ array: [...a], swapped: [i, j] });
  };

  const heapify = (n, i) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;

    if (largest !== i) {
      swap(i, largest);
      heapify(n, largest);
    }
  };

  const n = a.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    swap(0, i);
    heapify(i, 0);
  }

  steps.push({ array: [...a], swapped: [] });
  return steps;
}
