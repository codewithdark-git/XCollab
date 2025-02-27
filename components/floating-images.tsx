"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20204036-vA2a12Op7mqFnNO1QJZ352tB7nXOMc.png",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
  "https://images.unsplash.com/photo-1608306448197-e83633f1261c?w=800&q=80",
  "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
  "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=800&q=80",
]

export function FloatingImages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <div className="relative">
      {/* Curved shape background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5">
        <svg
          className="absolute bottom-0 w-full text-background dark:text-background"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "15vw", minHeight: "100px" }}
        >
          <path
            fill="currentColor"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Images container */}
      <div ref={containerRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="relative w-full max-w-3xl aspect-square" style={{ rotate, scale }}>
            {images.map((src, index) => {
              const angle = (index / images.length) * Math.PI * 2
              const x = Math.cos(angle) * 40 + 50
              const y = Math.sin(angle) * 40 + 50

              return (
                <motion.div
                  key={index}
                  className="absolute w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    x: "-50%",
                    y: "-50%",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Floating image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                    priority={index === 0}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

