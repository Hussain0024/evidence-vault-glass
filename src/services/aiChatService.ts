
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIChatService {
  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      console.log('Sending message to AI service:', message);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message,
          conversationHistory: conversationHistory.slice(-10) // Keep last 10 messages for context
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (!data.success) {
        throw new Error(data.error || 'AI service returned an error');
      }

      console.log('AI response received:', data.message);
      return data.message;

    } catch (error) {
      console.error('Error in AI chat service:', error);
      throw new Error('Sorry, I encountered an error. Please try again.');
    }
  }
}

export const aiChatService = new AIChatService();
