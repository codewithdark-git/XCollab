"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import matter from "gray-matter"
import fs from "fs"
import path from "path"

interface Partner {
  name: string
  logo: string
  description: string
}

interface PartnershipData {
  title: string
  description: string
  partners: Partner[]
}

export function Partnerships() {
  const [partnershipData, setPartnershipData] = useState<PartnershipData | null>(null)

  useEffect(() => {
    const fetchPartnershipData = async () => {
      const filePath = path.join(process.cwd(), "content", "partnerships.md")
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      setPartnershipData(data as PartnershipData)
    }

    fetchPartnershipData()
  }, [])

  if (!partnershipData) return null

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <SectionHeader title={partnershipData.title} subtitle={partnershipData.description} className="mb-16" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {partnershipData.partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-4 relative">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                  <p className="text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

