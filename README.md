# Quantum VRP Website

A modern, interactive Vehicle Routing Problem (VRP) solver with quantum-inspired algorithms and real-world data integration.

![VRP Solver Demo](https://img.shields.io/badge/Next.js-15.5.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-blue?logo=tailwindcss)

## 🚀 Features

- **Interactive VRP Solver**: Add locations, vehicles, and constraints with real-time visualization
- **Multiple Algorithms**: Classical nearest neighbor, quantum-inspired simulated annealing, and QUBO optimization
- **Real-World Data Support**: Import CSV/JSON files, handle GPS coordinates, capacity constraints
- **Modern UI/UX**: Built with Next.js 15, React 19, and Tailwind CSS with smooth animations
- **API Integration**: RESTful API endpoints for programmatic access
- **Export Functionality**: Download solutions in multiple formats

## 🛠️ Technologies

- **Frontend**: Next.js 15.5.0, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 3.4.0, Framer Motion
- **Icons**: Lucide React
- **Algorithms**: Classical heuristics, quantum-inspired optimization, QUBO simulation
- **Data Processing**: CSV/JSON parsing, Haversine distance calculation

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/quantum-vrp-website.git
   cd quantum-vrp-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Interactive Solver

1. **Add Locations**: Click on the map or enter coordinates manually
2. **Configure Vehicles**: Set capacity limits and starting positions
3. **Choose Algorithm**: Select from classical, quantum-inspired, or QUBO methods
4. **Solve & Visualize**: Get optimized routes with distance calculations
5. **Export Results**: Download solutions in CSV or JSON format

### Data Import

- **CSV Format**: `location_id,name,latitude,longitude,demand,time_window_start,time_window_end`
- **JSON Format**: Structured data with locations, vehicles, and constraints
- **Real-time Processing**: Upload files up to 100 locations

### API Usage

```bash
# Solve VRP via API
curl -X POST http://localhost:3000/api/solve-vrp \
  -H "Content-Type: application/json" \
  -d '{
    "locations": [...],
    "vehicles": [...],
    "depot": {...},
    "algorithm": "classical"
  }'
```

## 🧮 Algorithms

### 1. Classical Nearest Neighbor
- **Time Complexity**: O(n²)
- **Best For**: Small to medium datasets (< 50 locations)
- **Approach**: Greedy nearest neighbor with capacity constraints

### 2. Quantum-Inspired Simulated Annealing
- **Time Complexity**: O(n² × iterations)
- **Best For**: Medium datasets with complex constraints
- **Approach**: Probabilistic optimization with temperature cooling

### 3. QUBO (Quadratic Unconstrained Binary Optimization)
- **Time Complexity**: O(2ⁿ) - heuristic approximation
- **Best For**: Research and quantum computing simulation
- **Approach**: Binary optimization with penalty methods

## 📊 Real-World Applications

### Delivery Companies
- **Use Case**: Last-mile delivery optimization
- **Scale**: 25+ locations, 5+ vehicles
- **Constraints**: Time windows, vehicle capacity, driver hours

### Supply Chain
- **Use Case**: Warehouse to retailer distribution
- **Scale**: 50+ locations, 10+ vehicles
- **Constraints**: Multi-depot, mixed fleet, priority orders

### Field Services
- **Use Case**: Technician routing optimization
- **Scale**: 15+ locations, 8+ vehicles
- **Constraints**: Skill matching, appointment slots, equipment requirements

## 🏗️ Project Structure

```
quantum-vrp-website/
├── src/
│   ├── app/
│   │   ├── api/solve-vrp/          # VRP solving API endpoint
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Main page
│   ├── components/
│   │   ├── Benchmarks.tsx          # Algorithm benchmarking
│   │   ├── Footer.tsx              # Site footer
│   │   ├── Hero.tsx                # Hero section
│   │   ├── Navigation.tsx          # Navigation bar
│   │   ├── Problem.tsx             # Problem explanation
│   │   ├── QuantumApproach.tsx     # Quantum approach details
│   │   ├── RealWorldDataIntegration.tsx  # Data import/testing
│   │   ├── TechStack.tsx           # Technology showcase
│   │   └── VRPSolver.tsx           # Interactive solver
│   └── lib/
│       ├── quantum-vrp-solver.ts   # Quantum-inspired algorithms
│       └── vrp-solver.ts           # Classical VRP solver
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## 📈 Performance

- **Classical Algorithm**: Handles 100+ locations efficiently
- **Quantum-Inspired**: Optimal for 50-75 locations with complex constraints
- **Real-time Processing**: Sub-second response for typical datasets
- **Memory Usage**: Optimized for client-side processing

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **VRP Research Community** for algorithmic insights

---

**Made with ❤️ using Next.js, React, and TypeScript**
