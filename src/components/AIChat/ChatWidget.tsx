
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello ${user?.name}! I'm your AI assistant. I can help you with evidence management, blockchain verification, and answer questions about the platform. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('upload') || lowerMessage.includes('evidence')) {
      return "To upload evidence, navigate to the Upload page from the sidebar. Make sure your files are in supported formats (PDF, JPG, PNG, MP4). The system will automatically generate blockchain hashes for verification.";
    }
    
    if (lowerMessage.includes('blockchain') || lowerMessage.includes('verification')) {
      return "Blockchain verification ensures the integrity of your evidence. Once uploaded, files are hashed and registered on the blockchain. You can track verification progress on the Evidence Tracking page.";
    }
    
    if (lowerMessage.includes('team') || lowerMessage.includes('invite')) {
      return "You can manage team members from the Team Management page. Admin users can invite new members, assign roles (user, auditor, admin), and manage permissions.";
    }
    
    if (lowerMessage.includes('audit') || lowerMessage.includes('log')) {
      return "The Audit Log provides a comprehensive view of all system activities. You can search, filter, and export audit trails for compliance purposes.";
    }
    
    return "I'm here to help! You can ask me about evidence upload, blockchain verification, team management, audit logs, or any other platform features. What would you like to know more about?";
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-gray-100'
                      }`}
                      role="article"
                      aria-label={`${msg.type === 'user' ? 'Your message' : 'AI response'}: ${msg.content}`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.type === 'assistant' && (
                          <Bot className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        {msg.type === 'user' && (
                          <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <time className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 glass-button border-white/20 bg-white/5"
                    aria-label="Type your message"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
