import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPostBySlug, getSortedPostsData } from "@/lib/blog"
import Markdown from "react-markdown"

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  return (
    <div className="gradient-bg min-h-screen">
      <div className="container pt-32 pb-24">
        <article className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>

          <h1 className="font-mono text-4xl font-bold tracking-tighter mb-4">{post.title}</h1>

          <time className="text-sm text-muted-foreground block mb-8">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div className="prose dark:prose-invert max-w-none">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </div>
    </div>
  )
}

