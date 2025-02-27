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

export function MovingText() {
  return (
    <div className="overflow-hidden py-12 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10">
      {phrases.map((phrase, index) => (
        <motion.div
          key={index}
          initial={{ x: index % 2 === 0 ? "100%" : "-100%" }}
          animate={{ x: index % 2 === 0 ? "-100%" : "100%" }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="whitespace-nowrap mb-4 last:mb-0"
        >
          {[...Array(2)].map((_, repeatIndex) => (
            <span key={repeatIndex} className="inline-block mx-8">
              <span className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {phrase}
              </span>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

