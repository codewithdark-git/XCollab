"use client"

import { motion } from "framer-motion"

const phrases = [
  "Empowering creators",
  "Building decentralized economies",
  "Fostering innovation",
  "Connecting global talent",
  "Unleashing creativity",
  "Transforming communities",
  
]

export function ImprovedMovingText() {
  return (
    <div className="relative h-24 overflow-hidden bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-sky-500/10">
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-block">
              {phrases.map((phrase, index) => (
                <span
                  key={index}
                  className="inline-block mx-8 text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"
                >
                  {phrase}
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <motion.path
          d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z"
          fill="url(#wave-gradient)"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 8,
            ease: "easeInOut",
          }}
        />
        
      </svg>
    </div>
  )
}

