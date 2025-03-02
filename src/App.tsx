import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSkeleton from './components/ChatSkeleton';
import Header from './components/Header';
import { Message } from './types';
import { generateResponse } from './utils/gemini';
import { Bot } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typewriterKey, setTypewriterKey] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  // Reset typewriter animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTypewriterKey(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (content: string) => {
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    scrollToBottom();

    try {
      // Call Gemini API
      const responseContent = await generateResponse([...messages, userMessage]);

      // Create assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      // Add assistant response to chat
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      scrollToBottom();
    } catch (error) {
      console.error('Error generating response:', error);

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "Uh-oh! My circuits got a little scrambled 🤖💥Try again, and I'll do my best to get it right!",
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Quantum computing: Because regular computing wasn't confusing enough.",
    "Sustainable living tips—because saving the planet is cooler than a Tesla Cybertruck.",
    "Write a short story about a robot learning emotions… great, now I have to deal with robot drama.",
    "Plan me a 7-day trip to Japan (Because clearly, I moonlight as a travel agent.)"
  ];

  return (
    <div className="flex flex-col h-screen bg-dark-300 text-light-100">
      <Header onNewChat={handleNewChat} />

      <main className="flex-1 overflow-y-auto bg-primary">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <Bot className='w-14 h-14' />
            <h2 className="text-2xl font-bold text-light-100 mb-2 selection:bg-orange-500">Oh, it's you!😏</h2>
            <div className="h-6 mb-6 overflow-hidden">
              <p key={typewriterKey} className="text-orange-500 max-w-xl typewriter max-md:text-xs selection:bg-orange-500 selection:text-white">
                Powered by AI, fueled by sarcasm. Ask away—if you dare😏
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(suggestion)}
                  className={`p-3 text-left rounded-lg border border-dark-100 selection:bg-orange-500 hover:bg-[#030712] transition-colors fade-in delay-${(index + 1) * 100}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pb-32">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <ChatSkeleton />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <div className="absolute bottom-0 left-0 right-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
      <Analytics />
    </div>
  );
}

export default App;