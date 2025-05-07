"use client";

import { BadgeCheck, Globe, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInView, ScaleOnScroll } from "@/components/ParallaxWrapper";

const featureIcons = [
  {
    icon: BadgeCheck,
    title: "Trustless Validation",
    desc: "All monitors are verified on-chain by Web3 users—no middlemen or centralized servers.",
  },
  {
    icon: Lock,
    title: "Tamper-Proof",
    desc: "Immutable blockchain logs ensure no one can fake uptime history or manipulate monitoring data.",
  },
  {
    icon: Globe,
    title: "Globally Distributed",
    desc: "Uptime is verified from multiple geographic locations to ensure global accessibility.",
  },
  {
    icon: Zap,
    title: "Fast Updates",
    desc: "Near real-time feedback from node watchers with minimal latency and immediate notifications.",
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32 relative" id="features">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInView>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Our decentralized monitoring network leverages Web3 technology
              to provide unparalleled reliability and transparency.
            </p>
          </FadeInView>
        </div>

        {/* Main feature grid */}
        <ScaleOnScroll scaleTo={1.05}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featureIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeInView
                  key={item.title}
                  direction="up"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
                    }}
                    className="h-full bg-gradient-to-r from-web3-purple/80 to-web3-orange/80 p-8 rounded-2xl backdrop-blur-xl border border-border/20 flex flex-col items-center transition-all duration-300"
                  >
                    <div className="bg-gradient-to-br from-web3-orange to-web3-purple p-4 rounded-full mb-6 shadow-xl">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-muted-foreground text-center">{item.desc}</p>
                  </motion.div>
                </FadeInView>
              );
            })}
          </div>
        </ScaleOnScroll>

        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "99.99%", label: "Average uptime" },
            { value: "5,000+", label: "Monitored nodes" },
            { value: "7", label: "Supported chains" },
            { value: "24/7", label: "Real-time monitoring" }
          ].map((stat, i) => (
            <FadeInView key={stat.label} delay={i * 0.1} direction="up">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-muted/40 via-muted/20 to-background/90 border border-border/20">
                <h3 className="text-5xl font-bold text-gradient mb-4">{stat.value}</h3>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
