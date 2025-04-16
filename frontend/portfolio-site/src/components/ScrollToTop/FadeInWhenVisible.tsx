"use client"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

interface Props {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

const variants = {
  hidden: (direction: string) => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -50 }
      case "right":
        return { opacity: 0, x: 50 }
      case "up":
        return { opacity: 0, y: 50 }
      case "down":
        return { opacity: 0, y: -50 }
      default:
        return { opacity: 0 }
    }
  },
  visible: { opacity: 1, x: 0, y: 0 },
}

const FadeInWhenVisible = ({ children, direction = "up", delay = 0 }: Props) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      custom={direction}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible

