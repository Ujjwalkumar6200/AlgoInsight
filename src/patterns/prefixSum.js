export function prefixSumSteps(array) {
  const steps = [];
  const prefix = new Array(array.length).fill(0);
  
  steps.push({
    array: [...array],
    prefixSum: [...prefix],
    description: "Initial array",
    type: "initial"
  });

  prefix[0] = array[0];
  steps.push({
    array: [...array],
    prefixSum: [...prefix],
    description: `First prefix sum is just the first element: ${array[0]}`,
    type: "first-element"
  });

  for (let i = 1; i < array.length; i++) {
    prefix[i] = prefix[i - 1] + array[i];
    steps.push({
      array: [...array],
      prefixSum: [...prefix],
      currentIndex: i,
      currentSum: prefix[i],
      description: `Prefix[${i}] = ${prefix[i-1]} + ${array[i]} = ${prefix[i]}`,
      type: "compute"
    });
  }

  // Demonstrate range query
  const query = [2, 4]; // Example range
  if (array.length > 4) {
    const sum = prefix[query[1]] - (query[0] > 0 ? prefix[query[0]-1] : 0);
    steps.push({
      array: [...array],
      prefixSum: [...prefix],
      query: [...query],
      currentSum: sum,
      description: `Range sum [${query[0]}-${query[1]}] = ${prefix[query[1]]} - ${query[0] > 0 ? prefix[query[0]-1] : 0} = ${sum}`,
      type: "query"
    });
  }

  steps.push({
    array: [...array],
    prefixSum: [...prefix],
    description: "Prefix sum array complete",
    type: "complete"
  });

  return steps;
}