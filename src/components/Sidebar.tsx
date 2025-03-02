import React from 'react';
import { PlusCircle, MessageSquare, Settings, LogOut } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
}) => {
  return (
    <div className="h-full flex flex-col bg-dark-400 text-light-100 w-64 border-r border-dark-100">
      <div className="p-4 border-b border-dark-100">
        <button
          onClick={onNewSession}
          className="flex items-center justify-center w-full gap-2 py-2 px-4 rounded-md bg-cortix-600 hover:bg-cortix-700 text-white transition-colors"
        >
          <PlusCircle size={18} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2">
        <div className="space-y-1">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 truncate ${
                session.id === activeSessionId
                  ? 'bg-dark-300 text-light-100'
                  : 'hover:bg-dark-300 text-light-300'
              }`}
            >
              <MessageSquare size={16} />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-dark-100 space-y-1">
        <button className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 hover:bg-dark-300 text-light-300">
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-md flex items-center gap-2 hover:bg-dark-300 text-light-300">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;