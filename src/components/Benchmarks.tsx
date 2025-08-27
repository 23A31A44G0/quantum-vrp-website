"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, Play, Clock, Target, TrendingUp } from "lucide-react";

interface BenchmarkResult {
  algorithm: string;
  problemSize: number;
  totalDistance: number;
  processingTime: number;
  vehicleUtilization: number;
  qualityScore: number;
}

const Benchmarks = () => {
  const [benchmarkResults, setBenchmarkResults] = useState<BenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runBenchmarks = async () => {
    setIsRunning(true);
    setProgress(0);
    const results: BenchmarkResult[] = [];
    
    const problemSizes = [5, 10, 20, 30];
    const algorithms = ['classical', 'quantum', 'qubo'];
    const totalTests = problemSizes.length * algorithms.length;
    let completed = 0;

    for (const size of problemSizes) {
      // Generate random test problem
      const depot = { id: 'depot', name: 'Depot', lat: 40.7128, lng: -74.0060 };
      const locations = Array.from({ length: size }, (_, i) => ({
        id: `loc-${i}`,
        name: `Location ${i + 1}`,
        lat: depot.lat + (Math.random() - 0.5) * 0.1,
        lng: depot.lng + (Math.random() - 0.5) * 0.1,
        demand: Math.floor(Math.random() * 30) + 10
      }));
      const vehicles = Array.from({ length: Math.ceil(size / 5) }, (_, i) => ({
        id: `vehicle-${i}`,
        capacity: 100,
        startLocation: depot.id
      }));

      for (const algorithm of algorithms) {
        try {
          const startTime = Date.now();
          const response = await fetch('/api/solve-vrp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locations, vehicles, depot, algorithm })
          });
          
          if (response.ok) {
            const solution = await response.json();
            const processingTime = Date.now() - startTime;
            
            results.push({
              algorithm,
              problemSize: size,
              totalDistance: solution.totalDistance,
              processingTime,
              vehicleUtilization: solution.vehicleUtilization,
              qualityScore: Math.max(0, Math.min(100, ((1000 / (solution.totalDistance + 1)) * 100)))
            });
          }
        } catch (error) {
          console.error(`Error testing ${algorithm} with ${size} locations:`, error);
        }
        
        completed++;
        setProgress((completed / totalTests) * 100);
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    setBenchmarkResults(results);
    setIsRunning(false);
  };

  const exportResults = () => {
    const csv = [
      ['Algorithm', 'Problem Size', 'Total Distance', 'Processing Time (ms)', 'Vehicle Utilization', 'Quality Score'].join(','),
      ...benchmarkResults.map(r => [
        r.algorithm,
        r.problemSize,
        r.totalDistance.toFixed(2),
        r.processingTime,
        (r.vehicleUtilization * 100).toFixed(1),
        r.qualityScore.toFixed(1)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vrp-benchmarks.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm) {
      case 'classical': return 'bg-blue-500';
      case 'quantum': return 'bg-purple-500';
      case 'qubo': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Algorithm Benchmarks
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Benchmark Control</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Test Configuration</h4>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>Problem sizes: 5, 10, 20, 30 locations</div>
                  <div>Algorithms: Classical, Quantum, QUBO</div>
                  <div>Vehicles: Auto-scaled by problem size</div>
                  <div>Metrics: Distance, Time, Utilization</div>
                </div>
              </div>
              
              {isRunning && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Progress</span>
                    <span className="text-gray-400 text-sm">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={runBenchmarks}
                  disabled={isRunning}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors flex-1"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
                </button>
                
                {benchmarkResults.length > 0 && (
                  <button
                    onClick={exportResults}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Performance Overview</h3>
            
            {benchmarkResults.length === 0 ? (
              <div className="text-center text-gray-400 py-16">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Run benchmarks to see performance comparison</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Average Quality Score by Algorithm */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-400" />
                    Quality Score
                  </h4>
                  <div className="space-y-2">
                    {['classical', 'quantum', 'qubo'].map(algorithm => {
                      const results = benchmarkResults.filter(r => r.algorithm === algorithm);
                      const avgQuality = results.length > 0 
                        ? results.reduce((sum, r) => sum + r.qualityScore, 0) / results.length
                        : 0;
                      return (
                        <div key={algorithm} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(algorithm)}`} />
                            <span className="text-gray-300 capitalize">{algorithm}</span>
                          </div>
                          <span className="text-white font-medium">{avgQuality.toFixed(1)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Average Processing Time */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                    Avg Time (ms)
                  </h4>
                  <div className="space-y-2">
                    {['classical', 'quantum', 'qubo'].map(algorithm => {
                      const results = benchmarkResults.filter(r => r.algorithm === algorithm);
                      const avgTime = results.length > 0 
                        ? results.reduce((sum, r) => sum + r.processingTime, 0) / results.length
                        : 0;
                      return (
                        <div key={algorithm} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(algorithm)}`} />
                            <span className="text-gray-300 capitalize">{algorithm}</span>
                          </div>
                          <span className="text-white font-medium">{avgTime.toFixed(0)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Scalability */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                    Best Algorithm
                  </h4>
                  <div className="space-y-2">
                    {[5, 10, 20, 30].map(size => {
                      const sizeResults = benchmarkResults.filter(r => r.problemSize === size);
                      const bestResult = sizeResults.reduce((best, current) => 
                        current.qualityScore > best.qualityScore ? current : best
                      , sizeResults[0]);
                      
                      return bestResult && (
                        <div key={size} className="flex items-center justify-between">
                          <span className="text-gray-300">{size} locations</span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(bestResult.algorithm)}`} />
                            <span className="text-white font-medium capitalize">{bestResult.algorithm}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Detailed Results Table */}
        {benchmarkResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Detailed Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 py-3 px-4">Algorithm</th>
                    <th className="text-left text-gray-400 py-3 px-4">Size</th>
                    <th className="text-left text-gray-400 py-3 px-4">Distance</th>
                    <th className="text-left text-gray-400 py-3 px-4">Time (ms)</th>
                    <th className="text-left text-gray-400 py-3 px-4">Utilization</th>
                    <th className="text-left text-gray-400 py-3 px-4">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(result.algorithm)}`} />
                          <span className="text-white capitalize">{result.algorithm}</span>
                        </div>
                      </td>
                      <td className="text-gray-300 py-3 px-4">{result.problemSize}</td>
                      <td className="text-gray-300 py-3 px-4">{result.totalDistance.toFixed(2)} km</td>
                      <td className="text-gray-300 py-3 px-4">{result.processingTime}</td>
                      <td className="text-gray-300 py-3 px-4">{(result.vehicleUtilization * 100).toFixed(1)}%</td>
                      <td className="text-gray-300 py-3 px-4">{result.qualityScore.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Benchmarks;
