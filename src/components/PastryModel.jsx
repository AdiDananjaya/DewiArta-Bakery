import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei'

/**
 * Pastry Component
 * Currently renders a stylized Torus (Donut).
 * Structure follows a common pattern so it can be swapped with useGLTF later.
 */
export function Pastry(props) {
  const meshRef = useRef()

  // Auto-rotation logic
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group {...props}>
      {/* 
        This is where the primitive geometry lives. 
        To swap for a .glb model later, replace this mesh with:
        const { scene } = useGLTF('/path/to/model.glb')
        return <primitive object={scene} />
      */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusGeometry args={[1, 0.4, 32, 100]} />
        <MeshDistortMaterial
          color="#f59e0b" // Orange-600 inspired color
          speed={2}
          distort={0.2}
          radius={1}
        />
      </mesh>
      
      {/* Decorative inner "glaze" or detail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.42, 32, 100]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.1} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

export default Pastry
