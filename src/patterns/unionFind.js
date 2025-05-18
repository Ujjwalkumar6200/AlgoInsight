// Union-Find (Disjoint Set Union) with step-wise tracking

export function unionFindSteps(operations) {
  // operations is an array of {type: 'union'|'find', a, b}
  const parent = [];
  const rank = [];
  const steps = [];

  // Helper functions
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (a, b) => {
    let rootA = find(a);
    let rootB = find(b);
    if (rootA === rootB) return false;

    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootB] < rank[rootA]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA]++;
    }
    return true;
  };

  // Initialize parents and ranks assuming max node in operations
  const nodes = new Set();
  operations.forEach(({a,b}) => { nodes.add(a); nodes.add(b); });
  const maxNode = Math.max(...nodes);
  for(let i=0; i<=maxNode; i++){
    parent[i] = i;
    rank[i] = 0;
  }

  for(const op of operations){
    if(op.type === 'union'){
      union(op.a, op.b);
      steps.push({
        type: 'union',
        a: op.a,
        b: op.b,
        parent: [...parent],
        rank: [...rank],
      });
    } else if(op.type === 'find'){
      const root = find(op.a);
      steps.push({
        type: 'find',
        node: op.a,
        root,
        parent: [...parent],
      });
    }
  }

  return steps;
}
