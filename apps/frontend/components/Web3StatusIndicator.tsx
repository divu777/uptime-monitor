
"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type StatusType = 'connected' | 'limited' | 'disconnected';

export function Web3StatusIndicator() {
  const [status, setStatus] = useState<StatusType>('connected');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking connection status
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const statusConfig = {
    connected: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      pulseColor: 'before:bg-green-500',
      label: 'Connected',
      description: 'All services operational'
    },
    limited: {
      icon: Info,
      color: 'text-web3-orange-500',
      bgColor: 'bg-web3-orange-500',
      pulseColor: 'before:bg-web3-orange-500',
      label: 'Limited',
      description: 'Some services degraded'
    },
    disconnected: {
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      pulseColor: 'before:bg-red-500',
      label: 'Disconnected',
      description: 'Connection lost'
    }
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 px-3 border border-muted"
          >
            {isLoading ? (
              <div className="flex items-center space-x-1.5">
                <div className="status-indicator">
                  <div className="status-indicator-inner"></div>
                </div>
                <span className="text-xs font-medium">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-2.5 w-2.5 rounded-full ${currentStatus.bgColor}`}
                >
                  {status === 'connected' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      className="absolute inset-0 rounded-full bg-green-500 opacity-60 -z-10 blur-sm"
                    />
                  )}
                </motion.div>
                <span className="text-xs font-medium">{currentStatus.label}</span>
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="p-3 max-w-xs">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <StatusIcon className={`h-4 w-4 ${currentStatus.color}`} />
              <span className="font-medium">{currentStatus.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{currentStatus.description}</p>
            {status !== 'connected' && (
              <Button 
                size="sm" 
                className="mt-1 text-xs h-7"
              >
                Reconnect
              </Button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}