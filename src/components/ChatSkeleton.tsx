import React from 'react';
import { Bot } from 'lucide-react';

const ChatSkeleton: React.FC = () => {
  return (
    <div className="py-5 bg-dark-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 rounded-full bg-orange-500/40 flex items-center justify-center text-white/40">
              <Bot size={18} />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-dark-200 rounded animate-pulse-slow w-3/4"></div>
            <div className="h-4 bg-dark-200 rounded animate-pulse-slow w-1/2"></div>
            <div className="h-4 bg-dark-200 rounded animate-pulse-slow w-5/6"></div>
            <div className="h-4 bg-dark-200 rounded animate-pulse-slow w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;