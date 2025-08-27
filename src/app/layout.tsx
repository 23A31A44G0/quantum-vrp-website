import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quantum VRP - Optimizing Delivery Routes with Quantum Computing",
  description: "Revolutionary quantum computing approach to solving Vehicle Routing Problems. Explore QUBO formulations, quantum annealing, and hybrid algorithms for optimal route optimization.",
  keywords: "quantum computing, VRP, vehicle routing problem, QUBO, quantum annealing, optimization, logistics",
  authors: [{ name: "Quantum VRP Team" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}