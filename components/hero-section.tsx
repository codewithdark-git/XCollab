"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ImprovedMovingText } from "@/components/ImprovedMovingText"

export function HeroSection() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="relative pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-mono text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"
            >
              MAXIMIZING THE POWER OF CREATIVITY.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 font-mono text-center"
            >
              XCollab is an open-source middleware protocol founded in 2024 to revolutionize the creator economy. Our mission is to empower creators with complete control over their growth, fostering seamless collaboration, monetization, and innovation—without relying on intermediaries.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                className="font-mono bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 text-white hover:from-teal-600 hover:via-cyan-600 hover:to-sky-600"
                asChild
              >
                <a href="https://github.com/xcollab" target="_blank" rel="noopener noreferrer">
                  Get Started →
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Improved Moving Text */}
        <div className="mt-12 space-y-4">
          <ImprovedMovingText speed={30} />
          <ImprovedMovingText speed={25} />
        </div>
      </div>
    </div>
  )
}

