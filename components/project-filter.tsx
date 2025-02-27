"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ProjectFilterProps {
  languages: string[]
  onFilterChange: (language: string, searchTerm: string) => void
}

export function ProjectFilter({ languages, onFilterChange }: ProjectFilterProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    onFilterChange(language, searchTerm)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    onFilterChange(selectedLanguage, event.target.value)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedLanguage === "All" ? "default" : "outline"}
          onClick={() => handleLanguageChange("All")}
          className="font-mono"
        >
          All
        </Button>
        {languages.map((lang) => (
          <Button
            key={lang}
            variant={selectedLanguage === lang ? "default" : "outline"}
            onClick={() => handleLanguageChange(lang)}
            className="font-mono"
          >
            {lang}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
    </div>
  )
}

