import { NextRequest, NextResponse } from 'next/server';
import { Location, Vehicle, solveVRPClassical } from '@/lib/vrp-solver';
import { solveVRPQuantumInspired, solveVRPQUBO } from '@/lib/quantum-vrp-solver';

export async function POST(request: NextRequest) {
  try {
    const { locations, vehicles, depot, algorithm = 'classical' } = await request.json();

    // Validate input
    if (!locations || !vehicles || !depot) {
      return NextResponse.json(
        { error: 'Missing required parameters: locations, vehicles, depot' },
        { status: 400 }
      );
    }

    if (locations.length === 0 || vehicles.length === 0) {
      return NextResponse.json(
        { error: 'At least one location and one vehicle are required' },
        { status: 400 }
      );
    }

    // Solve the VRP problem
    let solution;
    const startTime = Date.now();

    switch (algorithm) {
      case 'classical':
        solution = solveVRPClassical(locations, vehicles, depot);
        break;
      case 'quantum':
        solution = solveVRPQuantumInspired(locations, vehicles, depot);
        solution.algorithm = 'quantum-inspired';
        break;
      case 'qubo':
        solution = solveVRPQUBO(locations, vehicles, depot);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid algorithm. Use "classical", "quantum", or "qubo"' },
          { status: 400 }
        );
    }

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      ...solution,
      algorithm,
      processingTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('VRP solving error:', error);
    return NextResponse.json(
      { error: 'Internal server error while solving VRP' },
      { status: 500 }
    );
  }
}

// GET endpoint for algorithm information
export async function GET() {
  return NextResponse.json({
    availableAlgorithms: [
      {
        name: 'classical',
        description: 'Classical nearest neighbor heuristic',
        complexity: 'O(n²)',
        suitable: 'Small to medium problems (< 100 locations)'
      },
      {
        name: 'quantum',
        description: 'Quantum-inspired optimization (QUBO)',
        complexity: 'O(log n) quantum advantage',
        suitable: 'Complex problems with constraints',
        status: 'In development'
      }
    ],
    limits: {
      maxLocations: 1000,
      maxVehicles: 50,
      timeout: 30000 // 30 seconds
    }
  });
}
