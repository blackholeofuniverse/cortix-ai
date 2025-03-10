import React from 'react';
import { Bot, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="bg-navy border-b border-dark-100 py-3 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
          <Bot className='w-5 h-5' />
        </div>
        <h1 className="text-light-100 font-semibold">Cortix AI</h1>
      </div>

      <button
        onClick={onNewChat}
        className="flex items-center gap-2 py-1.5 px-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
      >
        <PlusCircle size={16} />
        <span className="text-sm">New Chat</span>
      </button>
    </header>
  );
};

export default Header;