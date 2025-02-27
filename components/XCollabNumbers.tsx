"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Code, Star, GitFork } from "lucide-react"
import CountUp from "@/components/CountUp"
import { getProjects, getMembers } from "@/lib/github"

interface Stat {
  icon: React.ReactNode
  value: number
  label: string
}

export function XCollabNumbers() {
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, members] = await Promise.all([getProjects(), getMembers()])

        const totalStars = projects.reduce((sum, project) => sum + project.stars, 0)
        const totalForks = projects.reduce((sum, project) => sum + project.forks, 0)

        setStats([
          { icon: <Users className="w-8 h-8" />, value: members.length, label: "Community Members" },
          { icon: <Code className="w-8 h-8" />, value: projects.length, label: "Open Source Projects" },
          { icon: <Star className="w-8 h-8" />, value: totalStars, label: "GitHub Stars" },
          { icon: <GitFork className="w-8 h-8" />, value: totalForks, label: "Forks" },
        ])
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load community numbers. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
        <div className="container text-center">
          <p className="text-xl">Loading community numbers...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
        <div className="container text-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">XCollab in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 text-primary">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">
                <CountUp end={stat.value} duration={2} />
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

