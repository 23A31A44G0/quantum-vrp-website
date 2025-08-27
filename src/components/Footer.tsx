"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Atom } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    {
      category: "Project",
      items: [
        { name: "GitHub Repository", href: "#", icon: <Github className="w-4 h-4" /> },
        { name: "Documentation", href: "#", icon: <ExternalLink className="w-4 h-4" /> },
        { name: "Research Paper", href: "#", icon: <ExternalLink className="w-4 h-4" /> }
      ]
    },
    {
      category: "Resources",
      items: [
        { name: "Qiskit Documentation", href: "https://qiskit.org/documentation/", icon: <ExternalLink className="w-4 h-4" /> },
        { name: "Quantum Computing", href: "https://quantum-computing.ibm.com/", icon: <ExternalLink className="w-4 h-4" /> },
        { name: "VRP Algorithms", href: "#", icon: <ExternalLink className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Atom className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Quantum VRP</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing vehicle routing optimization through quantum computing. 
              Exploring the frontier of QUBO formulations and quantum annealing for 
              real-world logistics challenges.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{section.category}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Quantum VRP Project. Built with Next.js, React, and Quantum Computing principles.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Educational project demonstrating quantum approaches to optimization problems.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
