"use client"

import { useState, useEffect, type React } from "react"

interface TypingEffectProps {
  phrases: string[]
  className?: string
}

const TypingEffect: React.FC<TypingEffectProps> = ({ phrases, className }) => {
  const [currentPhrase, setCurrentPhrase] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentPhraseIndex = currentIndex % phrases.length
      const fullPhrase = phrases[currentPhraseIndex]

      if (!isDeleting && currentPhrase === fullPhrase) {
        setTimeout(() => setIsDeleting(true), 1500)
        return
      }

      if (isDeleting && currentPhrase === "") {
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => prevIndex + 1)
        return
      }

      const nextPhrase = isDeleting
        ? fullPhrase.substring(0, currentPhrase.length - 1)
        : fullPhrase.substring(0, currentPhrase.length + 1)

      setCurrentPhrase(nextPhrase)
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentPhrase, currentIndex, isDeleting, phrases])

  return <p className={className}>{currentPhrase}</p>
}

export default TypingEffect

