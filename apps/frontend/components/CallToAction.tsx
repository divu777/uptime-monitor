"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeInView } from "@/components/ParallaxWrapper";

export default function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-web3-orange to-web3-purple opacity-90 dark:opacity-80"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="radial" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            cx="30"
            cy="30"
            r="40"
            fill="url(#radial)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle
            cx="70"
            cy="70"
            r="30"
            fill="url(#radial)"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.4, opacity: 0.2 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <FadeInView direction="up" className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to secure your Web3 infrastructure?
          </h2>
          <p className="mb-8 text-white/90 text-lg max-w-2xl mx-auto">
            Start monitoring your Web3 project with decentralized trust in under
            60 seconds. No complicated setup or technical knowledge required.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 h-12 text-base font-medium bg-white text-web3-orange hover:bg-white/90"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                Create an Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 h-12 text-base font-medium text-white border-white hover:bg-white/10"
            >
              View Pricing
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-3 gap-8 text-white/90">
            <div>
              <h3 className="text-xl font-bold mb-1">Free Trial</h3>
              <p className="text-sm text-white/80">No credit card required</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">24/7 Support</h3>
              <p className="text-sm text-white/80">Technical assistance</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Flexible Plans</h3>
              <p className="text-sm text-white/80">Scale as you grow</p>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}