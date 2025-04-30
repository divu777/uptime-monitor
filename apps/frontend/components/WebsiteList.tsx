import React from 'react';
import WebsiteCard from './WebsiteCard';
import { AlertCircle } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';

interface WebsiteListProps {
  websites: Website[];
}

const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {
  console.log(JSON.stringify(websites)+"yeh rahi wesbitest")
  if (websites.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <AlertCircle className="h-12 w-12 mb-3 text-gray-400" />
        <h3 className="text-lg font-medium mb-1">No websites to monitor</h3>
        <p className="mb-4 text-sm">Add your first website to start monitoring uptime.</p>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-3">
      {websites.map(website => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
};

export default WebsiteList;