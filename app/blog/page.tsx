"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSortedPostsData } from "@/lib/blog"

export default function BlogPage() {
  const posts = getSortedPostsData()

  return (
    <div className="gradient-bg min-h-screen">
      <div className="container pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-mono text-5xl font-bold tracking-tighter mb-8">XCOLLAB BLOG</h1>
          <p className="text-xl text-muted-foreground font-mono">Insights, updates, and stories from our community</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="font-mono text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Badge variant="secondary" className="font-mono">
                    {new Date(post.date).toLocaleDateString()}
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-mono">
                    Read more →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

