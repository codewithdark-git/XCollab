"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, GitFork, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getProjects } from "@/lib/github"

interface Repository {
  id: number
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

export function TopStarredRepos() {
  const [repos, setRepos] = useState<Repository[]>([])

  useEffect(() => {
    const fetchTopRepos = async () => {
      const allProjects = await getProjects()
      setRepos(allProjects.slice(0, 3)) // Get top 3 starred repos
    }

    fetchTopRepos()
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Top GitHub Starred Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300">
                <CardContent className="flex-grow p-6">
                  <h3 className="font-mono text-xl font-bold gradient-text mb-4">{repo.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{repo.description}</p>
                  <Badge variant="outline" className="font-mono">
                    {repo.language}
                  </Badge>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center">
                      <GitFork className="w-4 h-4 mr-1" />
                      {repo.forks}
                    </span>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="font-mono">
                    <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        View <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

