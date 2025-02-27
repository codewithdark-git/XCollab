"use client"

import { motion } from "framer-motion"
import { Star, GitFork, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Repository {
  id: number
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

interface TopReposProps {
  repos: Repository[]
}

export function TopRepos({ repos }: TopReposProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full flex flex-col bg-secondary hover:bg-secondary/80 transition-colors duration-300 card-hover">
            <CardContent className="flex-grow p-6">
              <h3 className="font-mono text-xl font-bold mb-3 text-white">{repo.name}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{repo.description}</p>
              <Badge variant="outline" className="font-mono">
                {repo.language}
              </Badge>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stars}
                </span>
                <span className="flex items-center">
                  <GitFork className="w-4 h-4 mr-1" />
                  {repo.forks}
                </span>
              </div>
              <Button asChild variant="ghost" size="sm" className="font-mono text-white hover:text-white/80">
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
  )
}

