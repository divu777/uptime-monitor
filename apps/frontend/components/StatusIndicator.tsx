import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'up' | 'down';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconClass = sizeClasses[size];
  const textClass = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-center gap-1.5">
      {status === 'up' ? (
        <CheckCircle className={`${iconClass} text-emerald-500`} />
      ) : (
        <XCircle className={`${iconClass} text-rose-500`} />
      )}
      {showText && (
        <span 
          className={`font-medium ${textClass} ${
            status === 'up' ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {status === 'up' ? 'Online' : 'Offline'}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;