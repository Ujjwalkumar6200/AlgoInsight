import React from 'react';

const ArrayVisualizer = ({ data, highlighted, pointers }) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      {data.map((value, index) => {
        let isHighlighted = highlighted?.includes(index);
        let pointerClasses = [];
        
        if (pointers) {
          // Highlight different pointers with distinct colors
          if (pointers.left === index) pointerClasses.push('bg-yellow-500');
          if (pointers.right === index) pointerClasses.push('bg-green-500');
          if (pointers.mid === index) pointerClasses.push('bg-red-500');
          if (pointers.current === index) pointerClasses.push('bg-purple-500');
          if (pointers.selected === index) pointerClasses.push('bg-pink-500');
          
          // Add the new fast-slow pointers
          if (pointers.slow === index) pointerClasses.push('bg-orange-500');
          if (pointers.fast === index) pointerClasses.push('bg-teal-500');
        }

        // Combine all classes
        const baseClass = 'h-16 w-16 flex items-center justify-center text-white font-bold rounded-md';
        const highlightClass = isHighlighted ? 'bg-yellow-400' : 'bg-blue-300';
        const pointerClass = pointerClasses.join(' ');

        return (
          <div
            key={index}
            className={`${baseClass} ${highlightClass} ${pointerClass}`}
            style={{ transition: 'all 0.3s ease' }}
          >
            {value}
            {/* Add pointer labels */}
            {pointers && (
              <div className="absolute -bottom-6 text-xs font-semibold">
                {pointers.slow === index && <span className="text-orange-500">Slow</span>}
                {pointers.fast === index && <span className="text-teal-500">Fast</span>}
                {pointers.left === index && <span className="text-yellow-500">Left</span>}
                {pointers.right === index && <span className="text-green-500">Right</span>}
                {pointers.mid === index && <span className="text-red-500">Mid</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArrayVisualizer;