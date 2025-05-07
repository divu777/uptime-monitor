"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type StatusType = "online" | "offline" | "degraded" | "loading";

export function Web3StatusIndicator() {
  const [status, setStatus] = useState<StatusType>("loading");
  const [uptime, setUptime] = useState(99.97);
  const [lastChecked, setLastChecked] = useState(new Date());
  
  // Simulate real-time status checks
  useEffect(() => {
    const statuses: StatusType[] = ["online", "online", "online", "degraded"];
    const randomStatus = () => {
      setStatus("loading");
      setTimeout(() => {
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setStatus(newStatus);
        setLastChecked(new Date());
        // Update uptime based on status
        if (newStatus === "online") {
          setUptime((prev) => Math.min(99.99, prev + 0.01));
        } else if (newStatus === "degraded") {
          setUptime((prev) => Math.max(99.5, prev - 0.1));
        }
      }, 600);
    };
    
    // Initial status check
    randomStatus();
    
    // Periodic checks
    const interval = setInterval(randomStatus, 8000);
    return () => clearInterval(interval);
  }, []);
  
  // Status indicator component based on current status
  const StatusIcon = () => {
    switch (status) {
      case "online":
        return (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-green-500"
          >
            <CheckCircle className="h-6 w-6" />
          </motion.div>
        );
      case "offline":
        return (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-red-500"
          >
            <XCircle className="h-6 w-6" />
          </motion.div>
        );
      case "degraded":
        return (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-amber-500"
          >
            <AlertTriangle className="h-6 w-6" />
          </motion.div>
        );
      case "loading":
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="text-web3-blue"
          >
            <Clock className="h-6 w-6" />
          </motion.div>
        );
    }
  };
  
  const statusText = {
    online: "All systems operational",
    offline: "Service unavailable",
    degraded: "Degraded performance",
    loading: "Checking status...",
  };
  
  const statusColors = {
    online: "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400",
    offline: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400",
    degraded: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400",
    loading: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
  };
  
  return (
    <motion.div
      className={`relative glass max-w-md p-5 rounded-xl border ${statusColors[status]}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="absolute -top-2 -right-2">
        <motion.div
          className={`h-4 w-4 rounded-full ${status === "online" ? "bg-green-500" : status === "degraded" ? "bg-amber-500" : status === "offline" ? "bg-red-500" : "bg-blue-500"}`}
          animate={status === "online" ? { 
            boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.4)", "0 0 0 10px rgba(74, 222, 128, 0)", "0 0 0 0 rgba(74, 222, 128, 0)"] 
          } : undefined}
          transition={{ 
            repeat: Infinity, 
            duration: 2 
          }}
        />
      </div>
      
      <div className="flex items-center space-x-3 mb-3">
        <StatusIcon />
        <h3 className="font-medium text-lg">{statusText[status]}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <p className="text-muted-foreground">Current Uptime</p>
          <p className="font-semibold text-lg">{uptime.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-muted-foreground">Last Checked</p>
          <p className="font-semibold">
            {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      
      <div className="mt-5 pt-3 border-t border-border flex justify-between text-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>24h</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>7d</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
          <span>30d</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>90d</span>
        </div>
      </div>
    </motion.div>
  );
}