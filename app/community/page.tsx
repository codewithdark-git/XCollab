"use client"

import { motion } from "framer-motion"
import { Github, Twitter, MapPin, Users, Star, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { getMembers } from "@/lib/github"

export default async function CommunityPage() {
  const members = await getMembers()
  const admins = members.filter((member) => member.isAdmin)
  const regularMembers = members.filter((member) => !member.isAdmin)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Curved background for hero section */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background">
          <svg
            className="absolute bottom-0 w-full text-background"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ height: "15vw", minHeight: "100px" }}
          >
            <path
              fill="currentColor"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,133.3C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="container relative pt-32 pb-24">
          <SectionHeader
            title="MEET OUR COMMUNITY"
            subtitle="The passionate developers driving innovation at Xcollab"
          />

          {/* Admin Showcase */}
          <section className="mb-24">
            <h2 className="font-mono text-3xl font-bold mb-12 text-center">Community Leaders</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {admins.map((admin) => (
                <motion.div key={admin.id} variants={item}>
                  <Card className="group overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
                      <Badge className="absolute top-4 right-4 font-mono">Admin</Badge>
                    </div>
                    <CardContent className="relative pt-0">
                      <div className="flex flex-col items-center -mt-16">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                          <AvatarImage src={admin.avatar} alt={admin.name} />
                          <AvatarFallback>{admin.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-2xl font-bold mt-4">{admin.name}</h3>
                        <p className="text-muted-foreground font-mono">{admin.company || "Developer"}</p>

                        <p className="text-center mt-4 text-sm text-muted-foreground line-clamp-2">
                          {admin.bio || "Contributing to the future of open source development"}
                        </p>

                        {admin.location && (
                          <div className="flex items-center mt-4 text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{admin.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-3 mt-6">
                          <Button variant="outline" size="icon" asChild className="rounded-full">
                            <a href={admin.url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="icon" asChild className="rounded-full">
                            <a href={`mailto:${admin.login}@example.com`}>
                              <Mail className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="icon" asChild className="rounded-full">
                            <a href={`https://twitter.com/${admin.login}`} target="_blank" rel="noopener noreferrer">
                              <Twitter className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold">{admin.publicRepos}</p>
                            <p className="text-xs text-muted-foreground">Repos</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold">{admin.followers}</p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-2xl font-bold">{admin.publicRepos}</p>
                            <p className="text-xs text-muted-foreground">Repos</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Community Members */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            <div className="relative">
              <h2 className="font-mono text-3xl font-bold mb-12 text-center">Community Members</h2>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {regularMembers.map((member) => (
                  <motion.div key={member.id} variants={item}>
                    <Card className="group text-center hover:shadow-lg transition-all duration-300 h-full">
                      <CardContent className="pt-6">
                        <Avatar className="w-20 h-20 mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold truncate">{member.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 truncate">{member.company || "Developer"}</p>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {member.followers}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {member.publicRepos}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="relative mt-24 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-mono text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground mb-8">
                Be part of our growing community of developers and start contributing to amazing projects
              </p>
              <Button size="lg" className="font-mono">
                Become a Member →
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

