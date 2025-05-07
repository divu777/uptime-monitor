"use client";

import { BadgeCheck, Feather, Globe, Lock, Zap } from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LiveMonitoring from "@/components/LiveMonitoring";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const featureIcons = [
  {
    icon: BadgeCheck,
    title: "Trustless Validation",
    desc: "Monitors are verified on-chain by Web3 users—no middlemen.",
  },
  {
    icon: Lock,
    title: "Tamper-Proof",
    desc: "Immutable logs ensure no faking of uptime history.",
  },
  {
    icon: Globe,
    title: "Globally Distributed",
    desc: "Uptime is verified from multiple geolocations.",
  },
  {
    icon: Zap,
    title: "Fast Updates",
    desc: "Near real-time feedback from node watchers.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <Hero/>



      <LiveMonitoring/>

<Footer/>
    </div>
  );
}
