import { Location, Vehicle, VRPSolution, Route, createDistanceMatrix } from './vrp-solver';

// Simulated Annealing for VRP (quantum-inspired approach)
export function solveVRPQuantumInspired(
  locations: Location[], 
  vehicles: Vehicle[], 
  depot: Location,
  iterations: number = 1000
): VRPSolution {
  const allLocations = [depot, ...locations];
  const distanceMatrix = createDistanceMatrix(allLocations);
  
  // Initialize with a random solution
  let currentSolution = generateRandomSolution(locations, vehicles, depot, distanceMatrix);
  let bestSolution = { ...currentSolution };
  
  // Simulated Annealing parameters
  let temperature = 1000;
  const coolingRate = 0.995;
  const minTemperature = 0.01;
  
  for (let iteration = 0; iteration < iterations && temperature > minTemperature; iteration++) {
    // Generate neighbor solution using 2-opt or swap operations
    const neighborSolution = generateNeighborSolution(currentSolution, allLocations, distanceMatrix);
    
    // Calculate energy difference (total distance)
    const deltaE = neighborSolution.totalDistance - currentSolution.totalDistance;
    
    // Accept or reject the neighbor solution
    if (deltaE < 0 || Math.random() < Math.exp(-deltaE / temperature)) {
      currentSolution = neighborSolution;
      
      // Update best solution if improved
      if (neighborSolution.totalDistance < bestSolution.totalDistance) {
        bestSolution = { ...neighborSolution };
      }
    }
    
    // Cool down
    temperature *= coolingRate;
  }
  
  return bestSolution;
}

function generateRandomSolution(
  locations: Location[], 
  vehicles: Vehicle[], 
  depot: Location,
  distanceMatrix: number[][]
): VRPSolution {
  const allLocations = [depot, ...locations];
  const routes: Route[] = [];
  let unassigned = [...locations];
  
  for (const vehicle of vehicles) {
    if (unassigned.length === 0) break;
    
    const route: Route = {
      vehicleId: vehicle.id,
      locations: [depot],
      distance: 0,
      load: 0
    };
    
    // Randomly assign locations to this vehicle while respecting capacity
    const shuffled = [...unassigned].sort(() => Math.random() - 0.5);
    const assigned: Location[] = [];
    
    for (const location of shuffled) {
      const demand = location.demand || 0;
      if (route.load + demand <= vehicle.capacity) {
        assigned.push(location);
        route.load += demand;
      }
    }
    
    // Remove assigned locations from unassigned
    unassigned = unassigned.filter(loc => !assigned.includes(loc));
    
    // Add assigned locations to route
    route.locations.push(...assigned);
    route.locations.push(depot);
    
    // Calculate route distance
    for (let i = 0; i < route.locations.length - 1; i++) {
      const fromIndex = allLocations.findIndex(loc => loc.id === route.locations[i].id);
      const toIndex = allLocations.findIndex(loc => loc.id === route.locations[i + 1].id);
      route.distance += distanceMatrix[fromIndex][toIndex];
    }
    
    routes.push(route);
  }
  
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const totalTime = totalDistance / 50;
  const vehicleUtilization = routes.filter(r => r.locations.length > 2).length / vehicles.length;
  
  return {
    routes,
    totalDistance,
    totalTime,
    vehicleUtilization
  };
}

function generateNeighborSolution(
  currentSolution: VRPSolution,
  allLocations: Location[],
  distanceMatrix: number[][]
): VRPSolution {
  const routes = currentSolution.routes.map(route => ({ ...route, locations: [...route.locations] }));
  
  // Randomly choose improvement method
  const method = Math.random();
  
  if (method < 0.5) {
    // 2-opt improvement within a route
    twoOptImprovement(routes, allLocations, distanceMatrix);
  } else {
    // Relocate customer between routes
    relocateCustomer(routes, allLocations, distanceMatrix);
  }
  
  // Recalculate total metrics
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const totalTime = totalDistance / 50;
  const vehicleUtilization = routes.filter(r => r.locations.length > 2).length / routes.length;
  
  return {
    routes,
    totalDistance,
    totalTime,
    vehicleUtilization
  };
}

function twoOptImprovement(routes: Route[], allLocations: Location[], distanceMatrix: number[][]) {
  if (routes.length === 0) return;
  
  const routeIndex = Math.floor(Math.random() * routes.length);
  const route = routes[routeIndex];
  
  if (route.locations.length <= 3) return; // Need at least 4 locations for 2-opt
  
  // Exclude depot positions (first and last)
  const i = Math.floor(Math.random() * (route.locations.length - 3)) + 1;
  const j = Math.floor(Math.random() * (route.locations.length - 2 - i)) + i + 1;
  
  // Reverse the segment between i and j
  route.locations = [
    ...route.locations.slice(0, i),
    ...route.locations.slice(i, j + 1).reverse(),
    ...route.locations.slice(j + 1)
  ];
  
  // Recalculate route distance
  route.distance = 0;
  for (let k = 0; k < route.locations.length - 1; k++) {
    const fromIndex = allLocations.findIndex(loc => loc.id === route.locations[k].id);
    const toIndex = allLocations.findIndex(loc => loc.id === route.locations[k + 1].id);
    route.distance += distanceMatrix[fromIndex][toIndex];
  }
}

function relocateCustomer(routes: Route[], allLocations: Location[], distanceMatrix: number[][]) {
  if (routes.length < 2) return;
  
  // Find routes with customers
  const routesWithCustomers = routes.filter(r => r.locations.length > 2);
  if (routesWithCustomers.length < 2) return;
  
  const fromRoute = routesWithCustomers[Math.floor(Math.random() * routesWithCustomers.length)];
  const toRoute = routes[Math.floor(Math.random() * routes.length)];
  
  if (fromRoute === toRoute || fromRoute.locations.length <= 3) return;
  
  // Select random customer (exclude depot at start and end)
  const customerIndex = Math.floor(Math.random() * (fromRoute.locations.length - 2)) + 1;
  const customer = fromRoute.locations[customerIndex];
  
  // Check capacity constraint
  const customerDemand = customer.demand || 0;
  if (toRoute.load + customerDemand > 100) return; // Assuming max capacity 100
  
  // Remove customer from source route
  fromRoute.locations.splice(customerIndex, 1);
  fromRoute.load -= customerDemand;
  
  // Add customer to destination route (before returning to depot)
  const insertPosition = Math.floor(Math.random() * (toRoute.locations.length - 1)) + 1;
  toRoute.locations.splice(insertPosition, 0, customer);
  toRoute.load += customerDemand;
  
  // Recalculate distances for both routes
  [fromRoute, toRoute].forEach(route => {
    route.distance = 0;
    for (let i = 0; i < route.locations.length - 1; i++) {
      const fromIndex = allLocations.findIndex(loc => loc.id === route.locations[i].id);
      const toIndex = allLocations.findIndex(loc => loc.id === route.locations[i + 1].id);
      route.distance += distanceMatrix[fromIndex][toIndex];
    }
  });
}

// QUBO (Quadratic Unconstrained Binary Optimization) formulation simulator
export function solveVRPQUBO(
  locations: Location[], 
  vehicles: Vehicle[], 
  depot: Location
): VRPSolution {
  // This is a simplified QUBO approach simulation
  // In real implementation, this would interface with quantum hardware/simulators
  
  console.log('Simulating QUBO formulation for VRP...');
  console.log(`Problem size: ${locations.length} locations, ${vehicles.length} vehicles`);
  
  // For now, use the quantum-inspired simulated annealing
  const solution = solveVRPQuantumInspired(locations, vehicles, depot, 2000);
  
  // Add quantum-specific metadata
  solution.algorithm = 'QUBO (simulated)';
  
  return solution;
}
