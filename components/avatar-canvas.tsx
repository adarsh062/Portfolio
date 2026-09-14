"use client"

import { Suspense, useRef, useEffect, useMemo, Component } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useAnimations, useFBX, OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei"
import * as THREE from "three"

/* ────────────────────────────────────────────────────────────────────────── */
/*  Error Boundaries for catching loading or WebGL errors                    */
/* ────────────────────────────────────────────────────────────────────────── */
class OuterErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  state: { hasError: boolean; error: any } = { hasError: false, error: null }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("OuterErrorBoundary caught an error:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-red-500 bg-red-950/20 rounded-xl border border-red-500/30 text-center">
          <span className="font-bold text-sm">3D Canvas Error</span>
          <span className="font-mono text-[10px] break-all mt-2 opacity-80">{String(this.state.error?.message || this.state.error)}</span>
        </div>
      )
    }
    return this.props.children
  }
}

class CanvasErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  state: { hasError: boolean; error: any } = { hasError: false, error: null }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("CanvasErrorBoundary caught an error:", error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="flex flex-col items-center justify-center p-4 text-red-500 bg-stone-950/90 rounded-xl border border-red-500/50 text-center min-w-[240px] shadow-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider">Model Load Failed</span>
            <span className="font-mono text-[9px] mt-2 opacity-80 break-all leading-normal max-w-[220px]">
              {String(this.state.error?.message || this.state.error)}
            </span>
          </div>
        </Html>
      )
    }
    return this.props.children
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Inner model component – loads the FBX and plays idle animation           */
/* ────────────────────────────────────────────────────────────────────────── */
function AvatarModel() {
  const group = useRef<THREE.Group>(null!)
  const fbx = useFBX("/model.fbx")

  // Clone the model to prevent React 18/19 StrictMode double-rendering bugs
  const clonedFbx = useMemo(() => fbx.clone(true), [fbx])

  const { actions, names } = useAnimations(fbx.animations || [], group)

  useEffect(() => {
    // Play the first animation clip if one exists (idle / T-pose)
    if (names.length > 0) {
      const action = actions[names[0]]
      action?.reset().fadeIn(0.5).play()
      return () => { action?.fadeOut(0.5) }
    }
  }, [actions, names])

  // Subtle slow breathing bob
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.03
    }
  })

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={clonedFbx}
        scale={0.022}           // typical Ready Player Me / Mixamo FBX scale
        position={[0, -2.2, 0]}
        rotation={[0, 0.1, 0]}
        castShadow
      />
    </group>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Fallback skeleton while model loads                                       */
/* ────────────────────────────────────────────────────────────────────────── */
function AvatarFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full border-4 border-[#FF5A26] border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-[#FF5A26] tracking-widest uppercase">Loading model…</span>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Exported canvas wrapper                                                    */
/* ────────────────────────────────────────────────────────────────────────── */
export function AvatarCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ background: "transparent" }}>
      <OuterErrorBoundary>
        <Suspense fallback={<AvatarFallback />}>
          <Canvas
            camera={{ position: [0, 1.2, 4.5], fov: 38 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            shadows
          >
            {/* Lighting rig for a warm-toned, flattering render */}
            <ambientLight intensity={1.4} color="#FFF8F0" />
            <directionalLight
              position={[3, 6, 5]}
              intensity={2.0}
              color="#FFEEDD"
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#FFD0A0" />
            <pointLight position={[0, 4, 0]} intensity={0.4} color="#FF5A26" decay={2} />

            {/* Ground shadow */}
            <ContactShadows
              position={[0, -2.2, 0]}
              opacity={0.18}
              scale={5}
              blur={2.5}
              far={3}
              color="#1A1714"
            />

            {/* Model */}
            <Suspense fallback={null}>
              <CanvasErrorBoundary>
                <AvatarModel />
              </CanvasErrorBoundary>
            </Suspense>

            {/* Allow gentle orbit on desktop */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={Math.PI / 1.8}
              minAzimuthAngle={-0.5}
              maxAzimuthAngle={0.5}
              target={[0, 0.5, 0]}
              enableDamping
              dampingFactor={0.07}
            />
          </Canvas>
        </Suspense>
      </OuterErrorBoundary>
    </div>
  )
}
