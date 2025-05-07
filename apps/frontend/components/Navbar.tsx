"use client";

import React, { useState, useEffect } from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Menu, 
  X, 
  BarChart3, 
  AlertCircle, 
  Settings, 
  Cpu, 
  Wallet
} from 'lucide-react';
import { Web3StatusIndicator } from './Web3StatusIndicator';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/monitors", label: "Monitors", icon: Activity },
  { href: "/alerts", label: "Alerts", icon: AlertCircle },
  { href: "/chains", label: "Chains", icon: Cpu },
  { href: "/settings", label: "Settings", icon: Settings }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navbarClass = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'py-2 bg-background/80 glass-effect border-b border-border/50 navbar-glow' 
      : 'py-4 bg-transparent'}
  `;

  return (
    <header className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            >
              <Wallet 
                className="h-8 w-8 text-web3-orange-500" 
                strokeWidth={1.5} 
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">
                Web3
                <span className="text-web3-orange-500">Uptime</span>
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Blockchain Monitoring
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="navbar-link group"
                >
                  <div className="flex items-center space-x-1.5 px-3 py-1.5">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-web3-orange-500 transition-colors" />
                    <span>{link.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Status and Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <Web3StatusIndicator />
            
            <SignedOut>
              <Button  size="sm" asChild className="h-8">
                <SignInButton />
              </Button>
              <Button size="sm" asChild className="h-8">
                <SignUpButton />
              </Button>
            </SignedOut>
            
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'border-2 border-web3-orange-500',
                  }
                }}
              />
            </SignedIn>
            
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            <Web3StatusIndicator />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-web3-orange-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-web3-orange-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/90 glass-effect"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-muted/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-web3-orange-500" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <SignedOut>
                      <Button  size="sm" asChild>
                        <SignInButton />
                      </Button>
                      <Button size="sm" asChild>
                        <SignUpButton />
                      </Button>
                    </SignedOut>
                    
                    <SignedIn>
                      <UserButton 
                        appearance={{
                          elements: {
                            userButtonAvatarBox: 'border-2 border-web3-orange-500',
                          }
                        }}
                      />
                    </SignedIn>
                  </div>
                  
                  <ModeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;