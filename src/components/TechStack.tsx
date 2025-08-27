"use client";

import { motion } from "framer-motion";
import { Code, Target, Zap, Users, TrendingUp, BookOpen } from "lucide-react";

const TechStack = () => {
  const workflowSteps = [
    { label: "Problem Input", desc: "VRP parameters" },
    { label: "Mathematical Modeling", desc: "Problem formulation" },
    { label: "Algorithm Design", desc: "Optimization approach" },
    { label: "Solution Processing", desc: "Route extraction" },
    { label: "Results Analysis", desc: "Performance evaluation" }
  ];

  return (
    <section id="tech" className="py-16 bg-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Research Approach
        </motion.h2>

        {/* Workflow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Processing Workflow</h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div 
                  className={`p-4 rounded-lg text-center min-w-[140px] ${
                    index === 3 ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="font-semibold text-white text-sm">{step.label}</div>
                  <div className="text-xs text-gray-300 mt-1">{step.desc}</div>
                </motion.div>
                {index < workflowSteps.length - 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="mx-2 text-purple-400 text-xl font-bold"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Methodology Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Research Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Problem Analysis</h4>
              <p className="text-gray-400 text-sm">Comprehensive study of VRP constraints and objectives</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Algorithm Development</h4>
              <p className="text-gray-400 text-sm">Design and implementation of optimization algorithms</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Performance Evaluation</h4>
              <p className="text-gray-400 text-sm">Benchmarking and comparative analysis</p>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gray-900 rounded-xl p-8"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-white">Key Research Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Optimization Theory</h4>
              <p className="text-sm text-gray-400">Mathematical models & algorithms</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Logistics Management</h4>
              <p className="text-sm text-gray-400">Supply chain & route planning</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Academic Research</h4>
              <p className="text-sm text-gray-400">Theoretical foundations & analysis</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;