export default function binarySearch(arr, target) {
  const steps = [];
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      left,
      right,
      mid,
      highlighted: [mid],
      found: arr[mid] === target
    });

    if (arr[mid] === target) break;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return steps;
}