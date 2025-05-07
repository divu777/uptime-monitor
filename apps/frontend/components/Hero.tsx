"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Link2, Shield, Zap } from "lucide-react";
import {
  ParallaxSection,
  ParallaxLayer,
  FloatingElement,
} from "@/components/ParallaxWrapper";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, 100]);

  const particle1X = useTransform(scrollY, [0, 1000], [0, -100]);
  const particle1Y = useTransform(scrollY, [0, 1000], [0, -80]);
  const particle2X = useTransform(scrollY, [0, 1000], [0, 100]);
  const particle2Y = useTransform(scrollY, [0, 1000], [0, -50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ParallaxSection className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background accents (subtle motion) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-orange-500/10 blur-2xl"
          style={{ x: particle1X, y: particle1Y }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-orange-500/10 blur-2xl"
          style={{ x: particle2X, y: particle2Y }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20 md:pt-36 flex flex-col items-center">
        <ParallaxLayer speed={0.2} direction="up">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            style={{ opacity: headerOpacity, y: headerY }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-neutral-800/80 px-3 py-1 rounded-full text-sm font-medium mb-10"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              Now with multi-chain monitoring
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              Decentralized{" "}
              <span className="text-orange-500">Uptime</span>{" "}
              Monitoring
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Validated by real Web3 users. Monitored across chains.
              Immutable by design. The most reliable way to ensure your
              Web3 services stay online.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <Button size="lg" className="px-8 text-base h-12 bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base h-12 border-neutral-600 text-neutral-300 hover:bg-neutral-800"
              >
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </ParallaxLayer>

        {/* Feature Cards (Improved Spacing) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 w-full max-w-6xl mx-auto">
          {[
            { icon: Shield, title: "Web3 Verified", delay: 0 },
            { icon: BarChart2, title: "99.9% Accuracy", delay: 0.2 },
            { icon: Zap, title: "Real-time Alerts", delay: 0.4 },
            { icon: Link2, title: "Chain Agnostic", delay: 0.6 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <FloatingElement key={item.title} delay={item.delay} amplitude={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + item.delay, duration: 0.6 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col items-center text-center hover:border-orange-500 transition-colors"
                >
                  <div className="p-3 rounded-full bg-orange-500/10 mb-3">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                </motion.div>
              </FloatingElement>
            );
          })}
        </div>

        {/* Scroll Indicator (Mouse Icon) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center "
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-8 h-8 bg-neutral-700 border-2 border-neutral-500 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white w-2 h-2 rounded-full"
              />
            </div>
            <span className="text-xs text-neutral-500 mt-2">Scroll</span>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
