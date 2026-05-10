import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  Float,
  Html,
  useGLTF,
  ContactShadows,
} from '@react-three/drei'
import * as THREE from 'three'
const MODEL_URL = '/models/character.glb'

// ===== Blender-style toon outline =====
// Classic "inverted hull": for each mesh, duplicate it, push vertices outward
// along their normals by a small amount, render only the back-faces with a
// solid black material. The result is a clean dark edge around the silhouette.
const OUTLINE_THICKNESS = 0.018 // world units after model scaling
const OUTLINE_COLOR = '#1b1230'
const ENABLE_OUTLINE = false

function buildOutline(sourceMesh) {
  const geom = sourceMesh.geometry.clone()
  if (!geom.attributes.normal) geom.computeVertexNormals()
  // Inflate vertex positions along their normals
  const pos = geom.attributes.position
  const nrm = geom.attributes.normal
  const arr = pos.array
  const narr = nrm.array
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] += narr[i] * OUTLINE_THICKNESS
    arr[i + 1] += narr[i + 1] * OUTLINE_THICKNESS
    arr[i + 2] += narr[i + 2] * OUTLINE_THICKNESS
  }
  pos.needsUpdate = true
  const mat = new THREE.MeshBasicMaterial({
    color: OUTLINE_COLOR,
    side: THREE.BackSide,
  })
  const outline = new THREE.Mesh(geom, mat)
  outline.castShadow = false
  outline.receiveShadow = false
  outline.userData.__outline = true
  return outline
}

function CharacterGLB() {
  const { scene } = useGLTF(MODEL_URL)
  const groupRef = useRef()

  useEffect(() => {
    if (!groupRef.current) return

    // Add toon outlines once per mesh in the loaded scene
    if (ENABLE_OUTLINE) {
      scene.traverse((obj) => {
        if (
          obj.isMesh &&
          !obj.userData.__outline &&
          !obj.userData.__outlined &&
          obj.geometry
        ) {
          obj.userData.__outlined = true
          const outline = buildOutline(obj)
          obj.add(outline)
        }
      })
    }

    // Auto-fit and center the model
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 3.6
    const scale = targetSize / maxDim
    groupRef.current.scale.setScalar(scale)
    const box2 = new THREE.Box3().setFromObject(groupRef.current)
    const center2 = new THREE.Vector3()
    box2.getCenter(center2)
    groupRef.current.position.sub(center2)
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)

function Loader() {
  return (
    <Html center>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        padding: '8px 18px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        color: '#1b1230',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        Загрузка модели…
      </div>
    </Html>
  )
}

export default function CharacterScene() {
  const [interacting, setInteracting] = useState(false)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Останавливаем рендер когда сцена не видна
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', touchAction: 'none' }}>
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.5, 6], fov: 38 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.5}
          castShadow={!isMobile}
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#ffb4d9" />
        {!isMobile && <pointLight position={[0, 4, 0]} intensity={0.3} color="#b57bff" />}

        <Suspense fallback={<Loader />}>
          <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.2}>
            <CharacterGLB />
          </Float>
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={isMobile ? 0.2 : 0.35}
            scale={8}
            blur={isMobile ? 1.5 : 2.6}
            far={3}
            color="#1b1230"
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.75}
          autoRotate={!interacting}
          autoRotateSpeed={0.8}
          onStart={() => setInteracting(true)}
          onEnd={() => setInteracting(false)}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
