import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import QuantumApproach from '@/components/QuantumApproach';
import VRPSolver from '@/components/VRPSolver';
import RealWorldDataIntegration from '@/components/RealWorldDataIntegration';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <QuantumApproach />
      <VRPSolver />
      <RealWorldDataIntegration />
      <TechStack />
      <Footer />
    </main>
  );
}
