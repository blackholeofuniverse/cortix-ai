/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`py-5 ${isUser ? 'bg-primary' : 'bg-[#030712]'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            {isUser ? (
              <div className="w-8 h-8 rounded-full bg-[#0B192C] flex items-center justify-center text-white">
                <User size={18} />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
            )}
          </div>
          <div className="flex-1 markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              className="text-light-100 leading-relaxed selection:bg-orange-500"
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-3 mt-4" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-[#030712] pl-4 italic my-4 text-light-300" {...props} />
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-dark-100 text-light-100 px-1.5 py-0.5 rounded text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="bg-dark-100 rounded-md my-4 overflow-hidden">
                      <code className={`${className} block p-4 overflow-x-auto`} {...props}>
                        {children}
                      </code>
                    </div>
                  );
                },
                pre: ({ node, ...props }) => <pre className="bg-transparent p-0 m-0" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full divide-y divide-dark-100" {...props} />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th className="px-4 py-2 bg-dark-100 text-left text-light-100 font-medium" {...props} />
                ),
                td: ({ node, ...props }) => <td className="px-4 py-2 border-t border-dark-100" {...props} />,
                a: ({ node, ...props }) => (
                  <a className="text-accent hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                hr: ({ node, ...props }) => <hr className="my-6 border-dark-100" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;