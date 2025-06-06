
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, X, Send, Bot, User, AlertCircle } from 'lucide-react';
import { aiChatService } from '@/services/aiChatService';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  isError?: boolean;
}

export function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello ${user?.name}! I'm your AI assistant for BlockEvidence. I can help you with evidence management, blockchain verification, team collaboration, and answer questions about the platform. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getConversationHistory = () => {
    return messages
      .filter(msg => !msg.isLoading && !msg.isError)
      .map(msg => ({
        role: msg.type,
        content: msg.content
      }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      console.log('Sending message to AI:', userMessage.content);
      const conversationHistory = getConversationHistory();
      const aiResponse = await aiChatService.sendMessage(userMessage.content, conversationHistory);

      const assistantMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => prev.slice(0, -1).concat(assistantMessage));
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => prev.slice(0, -1).concat(errorMessage));
      
      toast({
        title: "AI Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open AI chat assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 z-50 animate-scale-in">
          <Card className="glass-card h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-400" />
                  AI Assistant
                  {isTyping && (
                    <span className="ml-2 text-xs text-blue-400 animate-pulse">
                      typing...
                    </span>
                  )}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '280px' }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : msg.isError
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-white/10 text-gray-100'
                      }`}
                      role="article"
                      aria-label={`${msg.type === 'user' ? 'Your message' : 'AI response'}: ${msg.content}`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.type === 'assistant' && (
                          <div className="flex-shrink-0 mt-0.5">
                            {msg.isError ? (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            ) : (
                              <Bot className="w-4 h-4 text-blue-400" />
                            )}
                          </div>
                        )}
                        {msg.type === 'user' && (
                          <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          {msg.isLoading ? (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          )}
                        </div>
                      </div>
                      {!msg.isLoading && (
                        <time className="text-xs opacity-70 mt-1 block">
                          {msg.timestamp.toLocaleTimeString()}
                        </time>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about BlockEvidence..."
                    className="flex-1 glass-button border-white/20 bg-white/5"
                    aria-label="Type your message"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!message.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
