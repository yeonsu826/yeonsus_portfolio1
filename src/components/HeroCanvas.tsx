import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { Theme } from '../hooks/useTheme'

const PARTICLE_COUNT = 1400
const FIELD_RADIUS = 9

function ParticleField({ theme }: { theme: Theme }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      // 구 껍질 근처에 고르게 뿌려 가운데가 비어 보이게 한다.
      const radius = FIELD_RADIUS * (0.55 + Math.random() * 0.45)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      array[i * 3 + 2] = radius * Math.cos(phi)
    }
    return array
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.035
    pointsRef.current.rotation.x += delta * 0.012
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={theme === 'dark' ? '#8ea2ff' : '#5b3df5'}
        transparent
        opacity={theme === 'dark' ? 0.85 : 0.5}
        sizeAttenuation
        depthWrite={false}
        // 밝은 배경에서는 가산 혼합이 흰색에 묻혀 보이지 않는다.
        blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

function CoreBlob({ theme }: { theme: Theme }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // 넓은 화면에서는 글 옆으로 비켜 세우고, 좁은 화면에서는 글 위쪽 가운데에 둔다.
  const isNarrow = viewport.aspect < 1
  const position: [number, number, number] = isNarrow ? [0, 1.5, -1] : [2.6, 0.15, 0]
  const scale = isNarrow ? 1.05 : 1.45

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18
    groupRef.current.rotation.y = state.clock.elapsedTime * -0.06
  })

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color={theme === 'dark' ? '#5b3ce0' : '#8f79ff'}
            emissive={theme === 'dark' ? '#1a0f4d' : '#2a1f6b'}
            emissiveIntensity={0.55}
            roughness={0.22}
            metalness={0.75}
            distort={0.42}
            speed={1.5}
          />
        </mesh>
        {/* 같은 형태를 조금 키워 선으로 덧씌워 윤곽을 살린다. */}
        <mesh scale={1.19}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#7fd6ff' : '#5b3df5'}
            wireframe
            transparent
            opacity={theme === 'dark' ? 0.14 : 0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

/** 마우스를 따라 카메라를 아주 조금 움직여 깊이감을 준다. */
function CameraRig() {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, delta) => {
    target.set(pointer.x * 1.1, pointer.y * 0.7, 8)
    camera.position.lerp(target, 1 - Math.pow(0.001, delta))
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroCanvas({ theme }: { theme: Theme }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      frameloop={prefersReducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={theme === 'dark' ? 0.5 : 1.1} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#8ef0ff" />
      <directionalLight position={[-5, -3, 2]} intensity={1.4} color="#b47cff" />
      <Suspense fallback={null}>
        <CoreBlob theme={theme} />
        <ParticleField theme={theme} />
      </Suspense>
      {!prefersReducedMotion && <CameraRig />}
    </Canvas>
  )
}
