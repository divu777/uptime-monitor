"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Web3StatusIndicator } from "@/components/Web3i";
import { ParallaxSection, FadeInView } from "@/components/ParallaxWrapper";

export default function LiveMonitoring() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ParallaxSection className="py-24 lg:py-32 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 right-0 w-full h-[500px] bg-web3-blue/5 rounded-full blur-3xl transform rotate-12 scale-150"></div>
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-web3-orange/5 rounded-full blur-3xl transform -rotate-12 scale-150"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Real-Time</span> Monitoring
            </h2>
            <p className="text-muted-foreground text-lg">
              See how your smart contracts or dApps are monitored 24/7 by our
              decentralized validator network.
            </p>
          </FadeInView>
        </div>
        
        {isClient && (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Live Status Card */}
            <FadeInView direction="right">
              <div className="p-1.5 rounded-2xl bg-gradient-to-br from-web3-orange via-web3-purple to-web3-blue">
                <div className="bg-background rounded-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Live Status Indicator</h3>
                    <p className="text-muted-foreground">
                      Embed this widget on your site to show your users real-time
                      uptime status
                    </p>
                  </div>
                  
                  <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                    <Web3StatusIndicator />
                  </div>
                </div>
              </div>
            </FadeInView>
            
            {/* Monitored Services */}
            <FadeInView direction="left">
              <div className="p-1.5 rounded-2xl bg-gradient-to-br from-web3-green via-web3-blue to-web3-purple">
                <div className="bg-background rounded-xl p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Monitored Services</h3>
                    <p className="text-muted-foreground">
                      Example of the various Web3 endpoints currently being monitored
                    </p>
                  </div>
                  
                  <div className="mt-6 flex-1 flex flex-col gap-4">
                    {[
                      { url: "https://polygon-rpc.com", status: "online" },
                      { url: "https://eth.llamarpc.com", status: "online" },
                      { url: "https://arbitrum.blockpi.network", status: "degraded" },
                      { url: "https://bsc-dataseed.binance.org", status: "online" },
                      { url: "https://api.avax.network", status: "online" },
                    ].map((service, i) => (
                      <motion.div
                        key={service.url}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/20 transition-colors"
                      >
                        <span className="text-sm font-mono text-muted-foreground truncate mr-3">
                          {service.url}
                        </span>
                        <div className="flex items-center">
                          <span className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            service.status === "online" 
                              ? "bg-green-500" 
                              : service.status === "degraded" 
                                ? "bg-amber-500" 
                                : "bg-red-500"
                          }`}></span>
                          <span className="text-xs capitalize">
                            {service.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        )}
        
        {/* Animation showing moving data packets */}
        <div className="mt-24 relative h-24 max-w-3xl mx-auto overflow-hidden">
          <FadeInView>
            <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-web3-blue via-web3-purple to-web3-orange"></div>
            {isClient && Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-3 w-3 rounded-full bg-web3-orange"
                style={{ left: `${i * 25}%` }}
                animate={{
                  x: ["calc(-100vw)", "calc(100vw)"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            {isClient && Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-3 w-3 rounded-full bg-web3-blue"
                style={{ left: `${i * 25 + 12}%` }}
                animate={{
                  x: ["calc(100vw)", "calc(-100vw)"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8 + 0.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </FadeInView>
        </div>
      </div>
    </ParallaxSection>
  );
}