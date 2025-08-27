"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Route } from "lucide-react";

const Problem = () => {
  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          The Problem: Vehicle Routing Problem (VRP)
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                The Vehicle Routing Problem is a classic combinatorial optimization problem that seeks to find the optimal set of routes for a fleet of vehicles to traverse in order to deliver to a given set of customers.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                It's a real-world challenge faced by logistics and supply chain companies, where even small improvements in route efficiency can lead to significant cost savings and reduced environmental impact.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-white">Fleet Management</h4>
                    <p className="text-sm text-gray-400">Multiple vehicles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                  <MapPin className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">Delivery Points</h4>
                    <p className="text-sm text-gray-400">Customer locations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                  <Route className="w-8 h-8 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">Optimization</h4>
                    <p className="text-sm text-gray-400">Minimal cost routes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced 4x4 grid map example with depot and delivery points */}
            <div className="relative p-6 bg-gray-900 rounded-xl shadow-2xl">
              <h3 className="text-center text-white font-semibold mb-4">Route Optimization Example</h3>
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 16 }).map((_, i) => {
                  const isDepot = i === 0;
                  const isDeliveryPoint = [3, 7, 10, 14].includes(i);
                  const isRoute = [1, 2, 6, 9, 13].includes(i);
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold
                        ${isDepot ? 'bg-blue-500 text-white' : ''}
                        ${isDeliveryPoint ? 'bg-green-500 text-white' : ''}
                        ${isRoute ? 'bg-purple-400 text-white' : ''}
                        ${!isDepot && !isDeliveryPoint && !isRoute ? 'bg-gray-700' : ''}
                      `}
                    >
                      {isDepot && '🏢'}
                      {isDeliveryPoint && '📦'}
                      {isRoute && '→'}
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-300">Depot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-300">Delivery Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded"></div>
                  <span className="text-gray-300">Route</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;