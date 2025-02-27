"use client"

import { motion } from "framer-motion"
import { Star, ArrowRight, Zap, Github, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import matter from "gray-matter"
import fs from "fs"
import path from "path"
import { getProjects } from "@/lib/github"
import { Badge } from "@/components/ui/badge"

interface FeaturedProject {
  title: string
  subtitle: string
  description: string
  image: string
  stars: number
  category: string
  cta: string
  ctaDescription: string
}

interface GithubProject {
  id: number
  name: string
  description: string
  stars: number
  forks: number
  url: string
  language: string
}

export function FeaturedProjects() {
  const [featuredProject, setFeaturedProject] = useState<FeaturedProject | null>(null)
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([])

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      const filePath = path.join(process.cwd(), "content", "projects", "featured-projects.md")
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      setFeaturedProject(data.featuredProject)
    }

    const fetchGithubProjects = async () => {
      const projects = await getProjects()
      setGithubProjects(projects.slice(0, 3)) // Get top 3 starred repos
    }

    fetchFeaturedProject()
    fetchGithubProjects()
  }, [])

  if (!featuredProject) return null

  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Featured Project from Markdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 to-sky-900 mb-24"
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative grid md:grid-cols-2 items-center min-h-[600px]">
            {/* Left side content */}
            <div className="p-8 md:p-16 lg:p-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {featuredProject.category}
                  </span>
                  <div className="flex items-center text-muted-foreground">
                    <Star className="mr-1 h-4 w-4" />
                    <span className="text-sm">{featuredProject.stars}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                    {featuredProject.title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-muted-foreground mb-6">{featuredProject.subtitle}</h3>
                  <p className="text-lg text-muted-foreground">{featuredProject.description}</p>
                </div>

                <Button variant="outline" size="lg" className="group/button border-primary/20 hover:border-primary/40">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Right side image */}
            <div className="relative p-8 md:p-16 lg:p-20">
              <div className="relative aspect-square">
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative h-full p-8">
                    <div className="absolute top-8 left-8 right-8">
                      <h3 className="text-3xl font-bold text-foreground/90">{featuredProject.cta}</h3>
                    </div>
                    <div className="absolute bottom-8 right-8 w-32 h-32">
                      <div className="relative w-full h-full">
                        <Image
                          src={featuredProject.image || "/placeholder.svg"}
                          alt={featuredProject.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 text-sm text-muted-foreground">
                      {featuredProject.ctaDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient border */}
          <div className="absolute inset-0 rounded-3xl border border-primary/10" />
        </motion.div>

        {/* GitHub Community Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-[#111111] mb-24"
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative p-8 md:p-16 lg:p-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Top GitHub Community Projects</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {githubProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary/80 rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Hover effect grid */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <pattern id="hover-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gold" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#hover-grid)" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 truncate relative z-10">{project.name}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 relative z-10">{project.description}</p>
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stars}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {project.forks}
                      </span>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {project.language}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 hover:from-teal-600 hover:via-cyan-600 hover:to-sky-600 relative z-10"
                  >
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      View Project
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gradient border */}
          <div className="absolute inset-0 rounded-3xl border border-primary/10" />
        </motion.div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="default"
            className="font-mono bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 text-white hover:from-teal-600 hover:via-cyan-600 hover:to-sky-600"
          >
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

