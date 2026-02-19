import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const RotatingStars = () => {
  const starsRef = useRef();

  // Dheere dheere rotate karne ke liye
  useFrame((state) => {
    starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={starsRef}>
      {/* Drei ki help se beautiful coding-nebula stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const Background3D = () => {
  return (
    // Fixed inset-0 ensures it stays behind everything
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: '#000' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
      </Canvas>
    </div>
  );
};

export default Background3D;