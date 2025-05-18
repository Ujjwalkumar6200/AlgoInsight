export function backtrackingSteps(items) {
  const steps = [];
  const solution = [];
  
  steps.push({
    items: [...items],
    currentPath: [],
    description: "Starting backtracking",
    type: "initial"
  });

  function backtrack(currentPath, options) {
    steps.push({
      items: [...items],
      currentPath: [...currentPath],
      options: [...options],
      description: `Current path: ${currentPath.join(' → ') || '[]'}`,
      type: "explore"
    });

    if (currentPath.length === items.length) {
      steps.push({
        items: [...items],
        currentPath: [...currentPath],
        description: "Found a complete solution",
        type: "solution"
      });
      return;
    }

    for (let i = 0; i < options.length; i++) {
      const choice = options[i];
      currentPath.push(choice);
      const newOptions = options.filter((_, index) => index !== i);
      
      steps.push({
        items: [...items],
        currentPath: [...currentPath],
        options: [...newOptions],
        description: `Choosing ${choice}`,
        type: "choose"
      });

      backtrack(currentPath, newOptions);
      
      currentPath.pop();
      steps.push({
        items: [...items],
        currentPath: [...currentPath],
        options: [...options],
        description: `Backtracking from ${choice}`,
        type: "backtrack"
      });
    }
  }

  backtrack([], [...items]);
  return steps;
}