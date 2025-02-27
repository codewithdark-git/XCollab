import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  avatar: string
}

export function TestimonialCard({ content, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow flex flex-col justify-between pt-6">
        <p className="text-lg mb-6">"{content}"</p>
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-4">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

