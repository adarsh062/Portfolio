"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    let app: any;
    let scrollTimeout: NodeJS.Timeout;

    const init = async () => {
      try {
        const module = await import("threejs-components/build/backgrounds/liquid1.min.js")
        const LiquidBackground = module.default || module
        
        if (typeof LiquidBackground === "function") {
          app = LiquidBackground(canvasRef.current)
          
          // app.loadImage("https://assets.codepen.io/33787/liquid.webp")
          
          app.liquidPlane.material.metalness = 0.75
          app.liquidPlane.material.roughness = 0.20
          const isMobile = window.innerWidth < 768;
          app.liquidPlane.uniforms.displacementScale.value = isMobile ? 2.0 : 3.5
          app.setRain(false)
          
          if (app.liquidPlane.material.color) {
            app.liquidPlane.material.color.setHex(0x0c0618) 
          }

          if (app.renderer) {
            app.renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.25))
          }

          gsap.to(canvasRef.current, {
            opacity: 1,
            duration: 2.5,
            ease: "sine.inOut"
          })
        }
      } catch (err) {
        console.error("Error loading fluid background:", err)
      }
    }
    
    init()
    
    const scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (!app || !app.liquidPlane) return;
        
        const isMobile = window.innerWidth < 768;
        const velocitySplash = Math.min(Math.abs(self.getVelocity() / 300), isMobile ? 3 : 8);
        const baseSplash = isMobile ? 8 : 12;

        gsap.to(app.liquidPlane.uniforms.displacementScale, {
          value: baseSplash + velocitySplash, 
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
          gsap.to(app.liquidPlane.uniforms.displacementScale, {
            value: 3.5,
            duration: 2.5, 
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto"
          });
        }, 150);
      }
    });

    // Very subtle mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 15
      const y = (e.clientY / window.innerHeight - 0.5) * 15
      
      gsap.to(canvasRef.current, {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out"
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    
    return () => {
      scrollTrigger.kill()
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(scrollTimeout);
      if (app && typeof app.destroy === "function") {
        app.destroy()
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#030108]">
      <div className="w-full h-full scale-[1.05] flex items-center justify-center relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full opacity-0" 
        />
      </div>
    </div>
  )
}
