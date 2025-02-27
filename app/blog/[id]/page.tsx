"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPostData, getSortedPostsData } from "@/lib/blog"
import Markdown from "react-markdown"

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id)

  if (!postData) {
    notFound()
  }

  return (
    <div className="gradient-bg min-h-screen">
      <div className="container pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-4xl font-bold tracking-tighter mb-4">{postData.title}</CardTitle>
              <Badge variant="secondary" className="font-mono">
                {new Date(postData.date).toLocaleDateString()}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{postData.content}</Markdown>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

