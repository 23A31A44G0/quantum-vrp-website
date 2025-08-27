"use client";

import { motion } from "framer-motion";
import { Zap, Clock, TrendingUp, Binary } from "lucide-react";

const QuantumApproach = () => {
  return (
    <section id="quantum" className="py-16 bg-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Our Quantum Approach
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">QUBO Formulation</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We formulate the VRP as a Quadratic Unconstrained Binary Optimization (QUBO) problem. This involves representing the problem with binary variables, a cost function to minimize, and penalties to enforce constraints.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                By leveraging quantum annealing and variational quantum algorithms, we can explore solution spaces exponentially faster than classical approaches.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <Binary className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Binary Variables</h4>
                  <p className="text-sm text-gray-400">Route decisions as qubits</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Cost Function</h4>
                  <p className="text-sm text-gray-400">Distance minimization</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced Classical vs Quantum comparison */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-center text-white font-semibold mb-6">Performance Comparison</h3>
              <div className="flex justify-around items-center">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mb-3 flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full text-white">
                      O(n!)
                    </div>
                  </div>
                  <p className="font-semibold text-white">Classical Solver</p>
                  <p className="text-sm text-gray-400">Exponential time</p>
                </motion.div>
                
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                />
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mb-3 flex items-center justify-center shadow-lg">
                      <Zap className="w-8 h-8 text-purple-200" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 text-xs px-2 py-1 rounded-full text-white">
                      O(√n)
                    </div>
                  </div>
                  <p className="font-semibold text-white">Quantum Solver</p>
                  <p className="text-sm text-gray-400">Quadratic speedup</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Quantum Algorithm Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Problem Encoding</h4>
            <p className="text-gray-400 text-sm">Convert VRP constraints into QUBO matrix format</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Quantum Processing</h4>
            <p className="text-gray-400 text-sm">Execute on quantum annealer or gate-based system</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Solution Decoding</h4>
            <p className="text-gray-400 text-sm">Extract optimal routes from quantum measurement</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantumApproach;