"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Star, GitFork, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjectFilter } from "@/components/project-filter"
import { getProjects } from "@/lib/github"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getProjects()
      setProjects(fetchedProjects)
      setFilteredProjects(fetchedProjects)

      const allLanguages = Array.from(new Set(fetchedProjects.flatMap((project) => project.languages))).sort()
      setLanguages(allLanguages)
    }

    fetchProjects()
  }, [])

  const handleFilterChange = (language: string, searchTerm: string) => {
    let filtered = projects

    if (language !== "All") {
      filtered = filtered.filter((project) => project.languages.includes(language))
    }

    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(lowercaseSearchTerm) ||
          project.description.toLowerCase().includes(lowercaseSearchTerm),
      )
    }

    setFilteredProjects(filtered)
  }

  return (
    <div className="gradient-bg min-h-screen">
      <div className="container pt-32 pb-24">
        <SectionHeader
          title="COMMUNITY PROJECTS"
          subtitle="Explore and contribute to innovative open-source projects from our community"
        />

        <ProjectFilter languages={languages} onFilterChange={handleFilterChange} />

        <AnimatePresence>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.languages.slice(0, 3).map((lang) => (
                        <Badge key={lang} variant="secondary" className="font-mono">
                          {lang}
                        </Badge>
                      ))}
                      {project.languages.length > 3 && (
                        <Badge variant="secondary" className="font-mono">
                          +{project.languages.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stars}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {project.forks}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="font-mono">
                      <Link href={project.url} target="_blank" rel="noopener noreferrer">
                        View Project
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}

