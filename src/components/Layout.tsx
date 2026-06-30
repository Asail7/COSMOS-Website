import React, { Suspense } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useLenis } from '../hooks/useLenis';
import { Canvas } from '@react-three/fiber';
import { StarField } from './StarField';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

function CSSStarField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="css-stars-1" />
      <div className="css-stars-2" />
      <div className="css-stars-3" />
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col relative text-foreground selection:bg-accent selection:text-white">
      <div className="fixed inset-0 z-[-1] bg-background">
        <WebGLErrorBoundary fallback={<CSSStarField />}>
          <Suspense fallback={<CSSStarField />}>
            <Canvas camera={{ position: [0, 0, 1] }}>
              <StarField />
            </Canvas>
          </Suspense>
        </WebGLErrorBoundary>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />
      </div>
      <Navigation />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
