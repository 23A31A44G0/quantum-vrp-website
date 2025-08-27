// VRP solver utilities - Real World Compatible Version
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  demand?: number;
  timeWindow?: {
    start: number;
    end: number;
  };
}

export interface Vehicle {
  id: string;
  capacity: number;
  startLocation: string;
  endLocation?: string;
}

export interface VRPSolution {
  routes: Route[];
  totalDistance: number;
  totalTime: number;
  vehicleUtilization: number;
  algorithm?: string;
  processingTime?: number;
  timestamp?: string;
}

export interface Route {
  vehicleId: string;
  locations: Location[];
  distance: number;
  load: number;
}

// Calculate distance using Haversine formula (real-world compatible)
export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371; // Earth's radius in km
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Create distance matrix for efficient lookup
export function createDistanceMatrix(locations: Location[]): number[][] {
  const n = locations.length;
  const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        matrix[i][j] = calculateDistance(locations[i], locations[j]);
      }
    }
  }
  
  return matrix;
}

// Simple but effective VRP solver for real-world data
export function solveVRPClassical(
  locations: Location[], 
  vehicles: Vehicle[], 
  depot: Location
): VRPSolution {
  const allLocations = [depot, ...locations];
  const routes: Route[] = [];
  const unvisited = [...locations]; // Copy locations array
  
  for (const vehicle of vehicles) {
    if (unvisited.length === 0) break;
    
    const route: Route = {
      vehicleId: vehicle.id,
      locations: [depot],
      distance: 0,
      load: 0
    };
    
    let currentLocation = depot;
    let currentLoad = 0;
    
    while (unvisited.length > 0) {
      let nearestIndex = -1;
      let nearestDistance = Infinity;
      
      // Find nearest unvisited location that fits capacity
      for (let i = 0; i < unvisited.length; i++) {
        const location = unvisited[i];
        const distance = calculateDistance(currentLocation, location);
        const demand = location.demand || 0;
        
        if (currentLoad + demand <= vehicle.capacity && distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
      
      if (nearestIndex === -1) break; // No more locations fit
      
      // Add location to route
      const location = unvisited[nearestIndex];
      route.locations.push(location);
      route.distance += nearestDistance;
      route.load += location.demand || 0;
      currentLoad += location.demand || 0;
      currentLocation = location;
      
      // Remove from unvisited
      unvisited.splice(nearestIndex, 1);
    }
    
    // Return to depot
    if (route.locations.length > 1) {
      route.distance += calculateDistance(currentLocation, depot);
      route.locations.push(depot);
      routes.push(route);
    }
  }
  
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);
  const totalTime = totalDistance / 50; // Assume 50 km/h average speed
  const vehicleUtilization = routes.length / vehicles.length;
  
  return {
    routes,
    totalDistance,
    totalTime,
    vehicleUtilization,
    algorithm: 'classical',
    processingTime: 0,
    timestamp: new Date().toISOString()
  };
}
