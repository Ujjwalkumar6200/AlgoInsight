export const dfsSteps = (graph, start) => {
  let steps = [];
  let visited = new Array(Object.keys(graph).length).fill(false);
  let stack = [start];

  steps.push({
    current: start,
    visited: [...visited],
    stack: [...stack],
    message: `Starting DFS at node ${start}`
  });

  while (stack.length) {
    let node = stack.pop();

    if (!visited[node]) {
      visited[node] = true;
      steps.push({
        current: node,
        visited: [...visited],
        stack: [...stack],
        message: `Visiting node ${node}`
      });

      for (let neighbor of [...graph[node]].reverse()) {
        if (!visited[neighbor]) {
          stack.push(neighbor);
          steps.push({
            current: node,
            visited: [...visited],
            stack: [...stack],
            message: `Pushing neighbor ${neighbor} of node ${node}`
          });
        }
      }
    }
  }

  return steps;
};
