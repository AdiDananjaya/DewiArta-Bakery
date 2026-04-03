import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, Float, ContactShadows } from '@react-three/drei'
import Pastry from './PastryModel'

/**
 * HeroCanvas Component
 * Sets up the 3D environment for the hero section.
 */
export function HeroCanvas() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] lg:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Optimizing for retina displays
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />

        <Suspense fallback={null}>
          <Float
            speed={1.5} 
            rotationIntensity={1} 
            floatIntensity={2}
          >
            <Pastry scale={1.5} position={[0, 0, 0]} />
          </Float>
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>

        {/* Orbit Controls for interaction */}
        <OrbitControls 
          enableZoom={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
    </div>
  )
}

export default HeroCanvas
