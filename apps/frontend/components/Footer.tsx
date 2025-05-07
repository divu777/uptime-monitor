"use client";

import Link from "next/link";
import { Github, MailIcon, Twitter } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/ParallaxWrapper";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company info */}
          <FadeInView direction="up" className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 mr-2 bg-gradient-to-br from-web3-orange to-web3-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W3</span>
              </div>
              <span className="font-bold text-xl">
                Web3<span className="text-web3-orange">Uptime</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The most trusted decentralized uptime monitoring solution for Web3 
              infrastructure, dApps, and smart contracts.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:info@web3uptime.com">
                  <MailIcon className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <ModeToggle />
            </div>
          </FadeInView>
          
          {/* Links */}
          <FadeInView direction="up" delay={0.1}>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Dashboard", "API", "Integrations"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInView>
          
          <FadeInView direction="up" delay={0.2}>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {["Documentation", "Blog", "Community", "Status", "Support"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInView>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} Web3Uptime. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}