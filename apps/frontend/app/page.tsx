"use client";


import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveMonitoring from "@/components/LiveMonitoring";
import Footer from "@/components/Footer";



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
