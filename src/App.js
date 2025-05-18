import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { mergeSortSteps } from './patterns/mergeSort';
import { kadaneSteps } from './patterns/kadane';
import { dfsSteps } from './patterns/dfs';
import { twoPointers } from './patterns/twoPointers';
import { slidingWindow } from './patterns/slidingWindow';
import { selectionSort } from './patterns/selectionSort';
import { bubbleSort } from './patterns/bubbleSort';
import { insertionSort } from './patterns/insertionSort';
import { unionFindSteps } from './patterns/unionFind';
import { heapSortSteps } from './patterns/heapSort';
import {fastSlowPointerSteps}  from './patterns/fastSlowPointers';
import { greedyCoinChangeSteps } from './patterns/greedyCoinChange';
import { backtrackingSteps } from './patterns/backtracking';
import { prefixSumSteps } from './patterns/prefixSum';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRedo } from 'react-icons/fa';
import ArrayVisualizer from './components/ArrayVisualizer';
import GraphVisualizer from './components/GraphVisualizer';

const binarySearch = (arr, target) => {
  const steps = [];
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({ left, right, mid, highlighted: [mid], found: arr[mid] === target });
    if (arr[mid] === target) break;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return steps;
};


function App() {
  const [pattern, setPattern] = useState('mergeSort');
  const [array, setArray] = useState([1, 3, 5, 7, 9, 11]);
  const [target, setTarget] = useState(9);
  const [windowSize, setWindowSize] = useState(3);
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [patternHistory, setPatternHistory] = useState([]);

  const graph = useMemo(() => ({
            0: [1, 2],
            1: [0, 3, 4],
            2: [0],
            3: [1],
            4: [1],
          }), []);

  const stepsMemo = useMemo(() => {
  switch (pattern) {
    case 'mergeSort': return mergeSortSteps(array);
    case 'kadane': return kadaneSteps(array);
    case 'dfs': return dfsSteps(graph, 0);
      case 'twoPointers': return twoPointers(array, target);
      case 'slidingWindow': return slidingWindow(array, windowSize);
      case 'selectionSort': return selectionSort(array);
      case 'bubbleSort': return bubbleSort(array);
      case 'insertionSort': return insertionSort(array);
      case 'binarySearch': return binarySearch(array,target);
      case 'unionFind': return unionFindSteps(array);
      case 'heapSort': return heapSortSteps(array);
      case 'fastSlowPointers': return fastSlowPointerSteps(array);
      case 'greedyCoinChange': 
        return greedyCoinChangeSteps(array, target);
      case 'backtracking': 
        return backtrackingSteps(array);
      case 'prefixSum': 
        return prefixSumSteps(array);
      default: return [];
    }
  }, [pattern, array, graph, target, windowSize]);

  useEffect(() => {
    setSteps(stepsMemo);
    setStep(0);
    setIsPlaying(false);
  }, [stepsMemo]);

  useEffect(() => {
    let interval;
    if (isPlaying && step < steps.length - 1) {
      interval = setInterval(() => setStep((prev) => prev + 1), speed);
    } else if (step >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, steps.length, speed]);

  const handlePatternChange = (newPattern) => {
    setPatternHistory((prev) => [pattern, ...prev]);
    setPattern(newPattern);
    setStep(0);
    setIsPlaying(false);
  };

 const handlePreviousPattern = () => {
  const previousPattern = patternHistory.at(-1);
  if (previousPattern) {
    setPattern(previousPattern);
    setPatternHistory((prev) => prev.slice(0, -1));
    setStep(0);
    setIsPlaying(false);
  }
};


  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 0));

  const patternButtons = [
    'mergeSort',
    'insertionSort',
    'selectionSort',
    'bubbleSort',
    'kadane',
    'dfs',
    'twoPointers',
    'slidingWindow',
    'binarySearch',
    'unionFind',
    'heapSort',
    'greedyCoinChange',
    'backtracking',
    'prefixSum',
    'fastSlowPointers', 
  ];

  return (
  <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Title */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-center rounded-t-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">🧠 Algorithm Pattern Visualizer</h1>
          </div>

          {/* Pattern Buttons */}
          <div className="p-4 border-b flex flex-wrap gap-2 justify-center">
            {patternButtons.map((p) => (
              <button
                key={p}
                onClick={() => handlePatternChange(p)}
                className={`px-4 py-2 rounded-xl shadow text-sm font-semibold transition ${
                  pattern === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {p.replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          {/* Inputs and Controls */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Array:</label>
                <input
                  type="text"
                  value={array.join(',')}
                    onChange={(e) => {
                          const input = e.target.value;
                          const parsedArray = input
                            .split(",")
                            .map((val) => parseInt(val.trim(), 10))
                            .filter((num) => !isNaN(num));
                          setArray(parsedArray.length ? parsedArray : []);
                        }}

                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {(pattern === 'twoPointers' || pattern === 'binarySearch'  || pattern === 'greedyCoinChange') && (
                <div>
                  <label className="block mb-1 font-semibold">Target:</label>
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      />

                </div>
              )}

              {pattern === 'slidingWindow' && (
                <div>
                  <label className="block mb-1 font-semibold">Window Size:</label>
                  <input
                    type="number"
                    value={windowSize}
                    onChange={(e) => setWindowSize(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* Fast & Slow pointer step info */}
            {pattern === 'fastSlowPointers' && (
              <ul className="text-sm space-y-1">
                <li>Slow Pointer: {steps[step]?.slow}</li>
                <li>Fast Pointer: {steps[step]?.fast}</li>
                <li>{steps[step]?.description}</li>
              </ul>
            )}

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePlayPause}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold ${
                    isPlaying ? 'bg-yellow-500' : 'bg-green-600'
                  }`}
                >
                  {isPlaying ? <><FaPause /> Pause</> : <><FaPlay /> Play</>}
                </button>
                <button onClick={handleReset} className="px-4 py-2 bg-gray-200 rounded-xl shadow">
                  <FaRedo />
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={handlePrev} disabled={step === 0} className="flex-1 px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50 shadow">
                  <FaStepBackward /> Previous
                </button>
                <button onClick={handleNext} disabled={step === steps.length - 1} className="flex-1 px-4 py-2 bg-gray-200 rounded-xl disabled:opacity-50 shadow">
                  Next <FaStepForward />
                </button>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Speed:</label>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value={1500}>Slow</option>
                  <option value={1000}>Normal</option>
                  <option value={500}>Fast</option>
                </select>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="p-4">
            {(pattern === 'dfs' || pattern === 'aStar') ? (
              <GraphVisualizer step={steps[step]} />
            ) : (
              <ArrayVisualizer
                data={steps[step]?.array || array}
                highlighted={steps[step]?.highlighted}
                pointers={{
                  left: steps[step]?.left,
                  right: steps[step]?.right,
                  mid: steps[step]?.mid,
                  current: steps[step]?.current,
                  selected: steps[step]?.selected
                }}
              />
            )}
          </div>

          {/* Step Info and Pattern Info */}
          <div className="p-6 bg-gray-50 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Step Info</h3>
              {/* Conditional Step Info */}
              {pattern === 'binarySearch' && (
                <ul className="text-sm space-y-1">
                  <li>Left: {steps[step]?.left}</li>
                  <li>Right: {steps[step]?.right}</li>
                  <li>Mid: {steps[step]?.mid}</li>
                  <li>Found: {steps[step]?.found ? 'Yes' : 'No'}</li>
                </ul>
              )}
              {pattern === 'twoPointers' && (
                <ul className="text-sm space-y-1">
                  <li>Left: {steps[step]?.left}</li>
                  <li>Right: {steps[step]?.right}</li>
                  <li>Sum: {steps[step]?.sum}</li>
                </ul>
              )}
              {pattern === 'slidingWindow' && (
                <ul className="text-sm space-y-1">
                  <li>Start: {steps[step]?.start}</li>
                  <li>End: {steps[step]?.end}</li>
                  <li>Max Sum: {steps[step]?.maxSum}</li>
                </ul>
              )}
              {pattern === 'greedyCoinChange' && (
                <ul className="text-sm space-y-1">
                  <li>Current Target: {steps[step]?.currentTarget}</li>
                  <li>Selected Coin: {steps[step]?.selectedCoin}</li>
                  <li>Coins Used: {steps[step]?.coinsUsed?.join(', ')}</li>
                </ul>
              )}
              {pattern === 'backtracking' && (
                <ul className="text-sm space-y-1">
                  <li>Current Path: {steps[step]?.currentPath?.join(' → ')}</li>
                  <li>Options: {steps[step]?.options?.join(', ')}</li>
                  <li>Backtracked: {steps[step]?.backtracked ? 'Yes' : 'No'}</li>
                </ul>
              )}
              {pattern === 'prefixSum' && (
                <ul className="text-sm space-y-1">
                  <li>Prefix Sum: {steps[step]?.prefixSum?.join(', ')}</li>
                  <li>Current Sum: {steps[step]?.currentSum}</li>
                  <li>Query: {steps[step]?.query && `[${steps[step].query.join(', ')}]`}</li>
                </ul>
              )}
              <p className="mt-2 text-sm text-gray-600">Step {step + 1} of {steps.length}</p>
            </div>

            {/* Pattern Info */}
            <div>
              <h3 className="text-lg font-bold mb-2">Pattern Info</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {pattern === 'mergeSort' && <><li>Divide-and-conquer algorithm</li><li>Time Complexity: O(n log n)</li><li>Stable sort</li></>}
                {pattern === 'insertionSort' && <><li>Simple comparison-based sort</li><li>Time Complexity: O(n²)</li><li>Good for nearly sorted arrays</li></>}
                {pattern === 'selectionSort' && <><li>Finds minimum each pass</li><li>Time Complexity: O(n²)</li><li>Not stable</li></>}
                {pattern === 'bubbleSort' && <><li>Repeatedly swaps adjacent elements</li><li>Time Complexity: O(n²)</li><li>Stable</li></>}
                {pattern === 'binarySearch' && <><li>Requires sorted array</li><li>O(log n) time</li><li>Constant space</li></>}
                {pattern === 'twoPointers' && <><li>Used on sorted arrays</li><li>O(n) time</li><li>Constant space</li></>}
                {pattern === 'slidingWindow' && <><li>Subarray-based problems</li><li>O(n) time</li><li>Constant space</li></>}
                {pattern === 'dfs' && <><li>Graph traversal algorithm</li><li>Time Complexity: O(V + E)</li><li>Uses recursion or stack</li></>}
                {pattern === 'unionFind' && <><li>Disjoint Set data structure</li><li>Amortized O(α(n)) per operation</li><li>Used in connectivity problems</li></>}
                {pattern === 'heapSort' && <><li>Comparison-based sorting using heap</li><li>O(n log n) time</li><li>Not stable</li></>}
                {pattern === 'fastSlowPointers' && <><li>Detect cycles in linked structures</li><li>O(n) time</li><li>Two pointers with different speeds</li></>}
                {pattern === 'greedyCoinChange' && <><li>Makes locally optimal choices</li><li>O(n log n) time typically</li><li>Doesn't always find optimal solution</li></>}
                {pattern === 'backtracking' && <><li>Systematic trial-and-error</li><li>Time Complexity: often exponential</li><li>Used for constraint satisfaction</li></>}
                {pattern === 'prefixSum' && <><li>Precomputes cumulative sums</li><li>O(n) preprocessing</li><li>O(1) range sum queries</li></>}
               { pattern === 'kadane' && (<><li>Finds maximum subarray sum</li><li>Dynamic Programming approach</li><li>Tracks local and global maximums</li><li>Time Complexity: O(n)</li><li>Efficient for solving subarray problems</li></>)}

              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;