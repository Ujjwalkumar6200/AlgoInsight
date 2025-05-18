import React from 'react';

const nodePositions = {
  0: { x: 200, y: 50 },
  1: { x: 100, y: 150 },
  2: { x: 300, y: 150 },
  3: { x: 50, y: 250 },
  4: { x: 150, y: 250 },
};

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
];

const GraphVisualizer = ({ step }) => {
  const visited = step?.visited || [];
  const current = step?.current;

  const getNodeColor = (node) => {
    if (current === node) return '#facc15'; // Current node - Yellow
    if (visited.includes(node)) return '#4ade80'; // Visited - Green
    return '#cbd5e1'; // Default - Gray
  };

  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 400 300" className="w-full max-w-md">
        {/* Draw edges */}
        {edges.map(([from, to], index) => {
          const start = nodePositions[from];
          const end = nodePositions[to];
          return (
            <line
              key={index}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#94a3b8"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* Arrow Definition */}
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* Draw nodes */}
        {Object.entries(nodePositions).map(([node, pos]) => (
          <g key={node}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="20"
              fill={getNodeColor(Number(node))}
              stroke="#1e293b"
              strokeWidth="2"
            />
            <text
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#1e293b"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
