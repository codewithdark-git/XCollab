"use client"

import { HeroSection } from "@/components/hero-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { Partnerships } from "@/components/partnerships"
import { XCollabNumbers } from "@/components/XCollabNumbers"
import { SectionHeader } from "@/components/ui/section-header"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Code, Users, Zap, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <Partnerships />

      <section className="py-24 bg-muted">
        <div className="container">
          <SectionHeader
            title="What Our Members Say"
            subtitle="Hear from the developers who are part of our thriving community"
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <TestimonialCard
              content="Xcollab has been instrumental in my growth as a developer. The community is supportive, and the projects are cutting-edge."
              author="Alex Johnson"
              role="Full Stack Developer"
              avatar="https://picsum.photos/seed/alex/100/100"
            />
            <TestimonialCard
              content="I've met amazing collaborators through Xcollab. It's not just a platform; it's a launchpad for innovation."
              author="Samantha Lee"
              role="UX Designer"
              avatar="https://picsum.photos/seed/samantha/100/100"
            />
            <TestimonialCard
              content="The open source projects on Xcollab have helped me learn new technologies and contribute to meaningful work."
              author="Michael Chen"
              role="Data Scientist"
              avatar="https://picsum.photos/seed/michael/100/100"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container">
          <SectionHeader
            title="Why Choose Xcollab?"
            subtitle="Empowering developers to create, collaborate, and innovate together"
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <FeatureCard
              title="Open Source"
              description="Contribute to and benefit from a wide range of open source projects"
              icon={Code}
            />
            <FeatureCard
              title="Community"
              description="Connect with like-minded developers from around the world"
              icon={Users}
            />
            <FeatureCard
              title="Innovation"
              description="Stay at the forefront of technology with cutting-edge projects"
              icon={Zap}
            />
            <FeatureCard
              title="Global Impact"
              description="Make a difference in the tech world on a global scale"
              icon={Globe}
            />
          </motion.div>
        </div>
      </section>

      <XCollabNumbers />
    </>
  )
}

