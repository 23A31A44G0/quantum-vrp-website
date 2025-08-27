"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Truck, Plus, Play, RotateCcw, Download } from "lucide-react";
import { Location, Vehicle, VRPSolution, solveVRPClassical } from "@/lib/vrp-solver";

const VRPSolver = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [depot, setDepot] = useState<Location>({
    id: "depot",
    name: "Depot",
    lat: 40.7128,
    lng: -74.0060
  });
  const [solution, setSolution] = useState<VRPSolution | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [algorithm, setAlgorithm] = useState<'classical' | 'quantum' | 'qubo'>('classical');

  const addLocation = () => {
    const newLocation: Location = {
      id: `loc-${locations.length + 1}`,
      name: `Location ${locations.length + 1}`,
      lat: depot.lat + (Math.random() - 0.5) * 0.1,
      lng: depot.lng + (Math.random() - 0.5) * 0.1,
      demand: Math.floor(Math.random() * 50) + 10
    };
    setLocations([...locations, newLocation]);
  };

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: `vehicle-${vehicles.length + 1}`,
      capacity: 100,
      startLocation: depot.id
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const solveProblem = async () => {
    if (locations.length === 0 || vehicles.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/solve-vrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locations,
          vehicles,
          depot,
          algorithm
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to solve VRP');
      }
      
      const result = await response.json();
      setSolution(result);
    } catch (error) {
      console.error('Error solving VRP:', error);
      alert('Error solving VRP problem. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetProblem = () => {
    setLocations([]);
    setVehicles([]);
    setSolution(null);
  };

  const exportSolution = () => {
    if (!solution) return;
    
    const data = {
      depot,
      locations,
      vehicles,
      solution
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vrp-solution.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="solver" className="py-16 bg-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Interactive VRP Solver
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Problem Configuration</h3>
            
            {/* Depot Configuration */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Depot Location
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Latitude"
                  value={depot.lat}
                  onChange={(e) => setDepot({...depot, lat: parseFloat(e.target.value) || 0})}
                  className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  step="0.0001"
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  value={depot.lng}
                  onChange={(e) => setDepot({...depot, lng: parseFloat(e.target.value) || 0})}
                  className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  step="0.0001"
                />
              </div>
            </div>

            {/* Locations */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-400" />
                  Delivery Locations ({locations.length})
                </h4>
                <button
                  onClick={addLocation}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Location</span>
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {locations.map((location, index) => (
                  <div key={location.id} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{location.name}</span>
                      <span className="text-gray-400 text-sm">Demand: {location.demand}</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicles */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-white flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-orange-400" />
                  Vehicles ({vehicles.length})
                </h4>
                <button
                  onClick={addVehicle}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {vehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{vehicle.id}</span>
                      <span className="text-gray-400 text-sm">Capacity: {vehicle.capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Algorithm Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                <Play className="w-5 h-5 mr-2 text-purple-400" />
                Algorithm Selection
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'classical', name: 'Classical (Nearest Neighbor)', desc: 'Fast, good for small problems' },
                  { value: 'quantum', name: 'Quantum-Inspired (Simulated Annealing)', desc: 'Better optimization, medium speed' },
                  { value: 'qubo', name: 'QUBO Formulation', desc: 'Quantum approach, best quality' }
                ].map((algo) => (
                  <label key={algo.value} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                    <input
                      type="radio"
                      value={algo.value}
                      checked={algorithm === algo.value}
                      onChange={(e) => setAlgorithm(e.target.value as any)}
                      className="mt-1 text-purple-500 focus:ring-purple-500"
                    />
                    <div>
                      <div className="text-white font-medium">{algo.name}</div>
                      <div className="text-gray-400 text-sm">{algo.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={solveProblem}
                disabled={locations.length === 0 || vehicles.length === 0 || isLoading}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex-1"
              >
                <Play className="w-4 h-4" />
                <span>{isLoading ? 'Solving...' : 'Solve VRP'}</span>
              </button>
              <button
                onClick={resetProblem}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Solution Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Solution Results</h3>
              {solution && (
                <button
                  onClick={exportSolution}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              )}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
              </div>
            )}

            {solution && !isLoading && (
              <div className="space-y-4">
                {/* Algorithm Info */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">
                        {solution.algorithm || algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Solved in {solution.processingTime}ms
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Quality Score</div>
                      <div className="text-lg font-bold text-green-400">
                        {((1000 / (solution.totalDistance + 1)) * 100).toFixed(0)}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {solution.totalDistance.toFixed(1)}
                    </div>
                    <div className="text-gray-400 text-sm">Total Distance (km)</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {solution.totalTime.toFixed(1)}
                    </div>
                    <div className="text-gray-400 text-sm">Total Time (hours)</div>
                  </div>
                </div>

                {/* Routes */}
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white">Routes:</h4>
                  {solution.routes.map((route, index) => (
                    <div key={route.vehicleId} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-white">{route.vehicleId}</h5>
                        <div className="text-sm text-gray-400">
                          {route.distance.toFixed(1)} km • Load: {route.load}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        {route.locations.map(loc => loc.name).join(' → ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!solution && !isLoading && (
              <div className="text-center text-gray-400 py-16">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Configure your VRP problem and click "Solve VRP" to see results</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VRPSolver;
