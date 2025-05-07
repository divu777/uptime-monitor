"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  style = {},
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate different transform values based on direction
  const yValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? ["0%", `${-speed * 100}%`] : direction === "down" ? ["0%", `${speed * 100}%`] : ["0%", "0%"]
  );
  
  const xValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["0%", `${-speed * 100}%`] : direction === "right" ? ["0%", `${speed * 100}%`] : ["0%", "0%"]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        y: direction === "up" || direction === "down" ? yValue : 0,
        x: direction === "left" || direction === "right" ? xValue : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxSection({ children, className = "" }: ParallaxSectionProps) {
  return (
    <div className={`parallax-container relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amplitude?: number;
}

export function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 6,
  amplitude = 15,
  className = "" 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [`0px`, `-${amplitude}px`, `0px`]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOnScroll({ 
  children, 
  className = "",
  scaleTo = 1.1
}: { 
  children: ReactNode;
  className?: string;
  scaleTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, scaleTo, 1]);
  
  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}) {
  // Define initial and animate properties based on direction
  let initial = { opacity: 0 };
  
  if (direction === "up") initial = { ...initial};
  if (direction === "down") initial = { ...initial,};
  if (direction === "left") initial = { ...initial,  };
  if (direction === "right") initial = { ...initial,  };
  
  return (
    <motion.div
      initial={initial}
      whileInView={{ 
        opacity: 1, 
        y: direction === "up" ? 0 : direction === "down" ? 0 : undefined,
        x: direction === "left" ? 0 : direction === "right" ? 0 : undefined
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}