'use client'
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Model } from '../Logo2.jsx';
import { RepeatWrapping, TextureLoader, WebGLRenderer } from "three";

import { useTexture } from "@react-three/drei";

export default function CustomLogo() {
  const ref = useRef<any>();
  useEffect(() => { 
    if (!ref.current) return;

    const safariRegex = /^((?!chrome|android).)*safari/i;

    // Check if the user agent string matches Safari
    const isSafari = safariRegex.test(navigator.userAgent);
    if (!isSafari) {ref.current.style.display = 'block';}
    if (!isWebGLAvailable()) { 
      ref.current.style.display = 'none';
    }

  },[])
  function isWebGLAvailable() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

  return (
    <div ref={ref} className="h-full p-[25px] hidden  rounded-full md:p-0 xl:p-1 2xl:p-3 z-60">
      <Canvas camera={{ position: [0, 0, 5] }} className="  bg-black w-full h-full z-60 rounded-full">
        <Model />
        <DarkRing />
        <Scene />
        <Ring />

      </Canvas>
    </div>
  )
}

function Ring() {

  return (
    <mesh rotation={[Math.PI * 0.55, Math.PI * 0.2, 0]} position={[0, 0, -2]}>
      <torusGeometry args={[4, 0.08, 16]} />
      <shaderMaterial uniforms={torusShader.uniforms} fragmentShader={torusShader.fragmentShaderTorus} vertexShader={torusShader.vertexShader} />
    </mesh>
  )
}

function DarkRing() {
  return (
    <mesh rotation={[Math.PI * 0.55, Math.PI * 0.2, 0]} position={[0, 0, -2]}>
      <torusGeometry args={[3.9, 0.08, 16]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  )
}

function Scene() {
  const meshRef = useRef<any>();
  const map = useTexture('/grid.jpg');
  const render = new WebGLRenderer();
  map.wrapS = RepeatWrapping;
  map.wrapT = RepeatWrapping;
  map.anisotropy = render.capabilities.getMaxAnisotropy();

  map.repeat.set(2, 2);




  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 4;
    meshRef.current.rotation.x = 21.1;
  })
  return (
    <mesh ref={meshRef} position={[0, 0, -2.4]}>
      <sphereGeometry args={[4, 70, 70]} />
      <meshBasicMaterial map={map} />
    </mesh>
  )
}



const torusShader = {
  uniforms: {
    time: { value: 0.0 },
  },
  fragmentShaderTorus: `
      varying vec2 vUv;
      uniform float time;
  
     void main() {
        
      gl_FragColor = vec4(1.0,1.0,0.0,1.0);
  }
  `,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
}

