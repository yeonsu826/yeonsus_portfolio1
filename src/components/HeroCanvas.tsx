import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { Theme } from '../hooks/useTheme'

const PARTICLE_COUNT = 1200
const FIELD_RADIUS = 9
const STAR_TEXTURE = `${import.meta.env.BASE_URL}imgs/star.png`

function ParticleField({ theme }: { theme: Theme }) {
  const pointsRef = useRef<THREE.Points>(null)
  const starMap = useTexture(STAR_TEXTURE)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const array = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = FIELD_RADIUS * (0.55 + Math.random() * 0.45)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      array[i * 3 + 2] = radius * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(array, 3))
    return geo
  }, [])

  useEffect(() => {
    starMap.colorSpace = THREE.SRGBColorSpace
    starMap.premultiplyAlpha = false
    starMap.needsUpdate = true
  }, [starMap])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x += delta * 0.015
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        map={starMap}
        alphaMap={starMap}
        size={0.16}
        color={theme === 'dark' ? '#f0d7a8' : '#a56b1f'}
        transparent
        opacity={theme === 'dark' ? 0.95 : 0.75}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.05}
        blending={theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

function CoreBlob({ theme }: { theme: Theme }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const isNarrow = viewport.aspect < 1
  const position: [number, number, number] = isNarrow ? [0, 1.35, -1] : [2.6, 0.15, 0]
  const scale = isNarrow ? 1.05 : 1.45

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.12
    groupRef.current.rotation.y = state.clock.elapsedTime * -0.08
  })

  return (
    <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1.05}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color={theme === 'dark' ? '#c4893a' : '#d4a05a'}
            emissive={theme === 'dark' ? '#3a2410' : '#5a3a12'}
            emissiveIntensity={0.5}
            roughness={0.28}
            metalness={0.62}
            distort={0.42}
            speed={1.6}
          />
        </mesh>
        <mesh scale={1.19}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#e8c48a' : '#a56b1f'}
            wireframe
            transparent
            opacity={theme === 'dark' ? 0.18 : 0.24}
          />
        </mesh>
      </group>
    </Float>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 0, 8), [])

  useFrame((_, delta) => {
    target.set(pointer.x * 0.9, pointer.y * 0.55, 8)
    camera.position.lerp(target, 1 - Math.pow(0.0008, delta))
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroCanvas({ theme }: { theme: Theme }) {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
      style={{ width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={theme === 'dark' ? 0.45 : 1.05} />
      <directionalLight position={[4, 5, 6]} intensity={2.0} color="#ffe2b0" />
      <directionalLight position={[-5, -3, 2]} intensity={1.15} color="#8a7a62" />
      {/* 블롭과 파티클을 분리해, 텍스처 로딩이 전체 씬을 막지 않게 한다. */}
      <Suspense fallback={null}>
        <CoreBlob theme={theme} />
      </Suspense>
      <Suspense fallback={null}>
        <ParticleField theme={theme} />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
