'use client'
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Globe, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, subMinutes, isWithinInterval, startOfMinute } from 'date-fns';

export interface Website {
  id: string;
  url: string;
  website_ticks: {
    id: string;
    createdAt: string;
    status: "Good" | "Bad"|null;
    latency: number;
  }[];
}
interface WebsiteCardProps {
  website: Website;
}

interface AggregatedTick {
  timestamp: Date;
  status: "Good" | "Bad"|null;
  avgLatency: number;
  totalChecks: number;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const { latestTick, aggregatedTicks } = useMemo(() => {
    const now = new Date();
    const thirtyMinutesAgo = subMinutes(now, 30);
    
    // Sort ticks by date, most recent first
    const sortedTicks = [...website.website_ticks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Get the latest tick
    const latestTick = sortedTicks[0] || null;
    
    // Filter ticks within last 30 minutes and aggregate into 3-minute windows
    const recentTicks = sortedTicks.filter(tick => {
      try {
        return isWithinInterval(new Date(tick.createdAt), {
          start: thirtyMinutesAgo,
          end: now
        });
      } catch  {
        console.error('Invalid date:', tick.createdAt);
        return false;
      }
    });

    const aggregated: AggregatedTick[] = [];
    
    // Create 10 three-minute windows
    for (let i = 0; i < 10; i++) {
      const windowEnd = subMinutes(now, i * 3);
      const windowStart = subMinutes(windowEnd, 3);
      
      const windowTicks = recentTicks.filter(tick => {
        try {
          return isWithinInterval(new Date(tick.createdAt), {
            start: windowStart,
            end: windowEnd
          });
        } catch {
          console.error('Invalid date in window check:', tick.createdAt);
          return false;
        }
      });
      
      if (windowTicks.length > 0) {
        const goodTicks = windowTicks.filter(t => t.status ==="Good").length;
        const avgLatency = windowTicks.reduce((sum, tick) => sum + tick.latency, 0) / windowTicks.length;
        
        aggregated.push({
          timestamp: startOfMinute(windowEnd),
          status: goodTicks >= windowTicks.length / 2 ? "Good" : "Bad",
          avgLatency,
          totalChecks: windowTicks.length
        });
      } else {
        aggregated.push({
          timestamp: startOfMinute(windowEnd),
          status: null,
          avgLatency: 0,
          totalChecks: 0
        });
      }
    }

    return { latestTick, aggregatedTicks: aggregated.reverse() };
  }, [website.website_ticks]);

  const getStatusDisplay = () => {
    if (!latestTick) {
      return {
        icon: <AlertCircle className="h-4 w-4 text-gray-400" />,
        text: 'No Data',
        color: 'text-gray-400'
      };
    }

    return {
      icon: <span className="h-2.5 w-2.5 rounded-full bg-current" />,
      text: latestTick.status === "Good" ? 'Online' : 'Offline',
      color: latestTick.status === "Good" ? 'text-emerald-600' : 'text-rose-600'
    };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-2 rounded-md">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{website.url}</h3>
            <p className="text-sm text-gray-500">
              {latestTick 
                ? `Last checked: ${formatDistanceToNow(new Date(latestTick.createdAt), { addSuffix: true })}`
                : 'No checks recorded yet'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center gap-2 ${statusDisplay.color}`}>
            {statusDisplay.icon}
            <span className="text-sm font-medium">
              {statusDisplay.text}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Last 30 Minutes Status</h4>
            <div className="flex gap-1">
              {aggregatedTicks.map((tick, index) => (
                <div
                  key={index}
                  className={`flex-1 h-16 rounded-sm relative group ${
                    tick.status === null
                      ? 'bg-gray-200'
                      : tick.status === "Good"
                      ? 'bg-emerald-500'
                      : 'bg-rose-500'
                  } ${tick.totalChecks === 0 ? 'opacity-40' : ''}`}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    <div className="text-center mb-1">
                      {formatDistanceToNow(tick.timestamp, { addSuffix: true })}
                    </div>
                    {tick.totalChecks === 0 ? (
                      'No data available'
                    ) : (
                      <>
                        Status: {tick.status === "Good" ? 'Online' : 'Offline'}
                        <br />
                        Avg Latency: {tick.avgLatency.toFixed(1)}ms
                        <br />
                        Checks: {tick.totalChecks}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Each bar represents a 3-minute window. Gray bars indicate no data available.
            </p>
          </div>
          
          {latestTick ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Latest Latency</span>
                <span className="font-medium text-gray-900">{latestTick.latency.toFixed(2)}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Status</span>
                <span className={`font-medium ${
                  latestTick.status === "Good" ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {latestTick.status === "Good" ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">
              No monitoring data available yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteCard;