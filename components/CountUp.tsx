"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface CountUpProps {
  end: number
  duration: number
}

const CountUp: React.FC<CountUpProps> = ({ end, duration }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        setCount(Math.floor(start))
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [end, duration, inView])

  return <span ref={ref}>{count}</span>
}

export default CountUp

