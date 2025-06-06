
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { message, conversationHistory = [] } = await req.json();

    // System prompt with context about the evidence management platform
    const systemPrompt = `You are an AI assistant for BlockEvidence, a blockchain-based evidence management platform. You help users with:

1. Evidence Management: Uploading, organizing, and tracking digital evidence
2. Blockchain Verification: Understanding how blockchain ensures evidence integrity
3. Team Collaboration: Managing team members, roles, and permissions
4. Audit Trails: Tracking all activities and maintaining compliance
5. Platform Navigation: Helping users find features and understand workflows

Key features to know about:
- Evidence Upload: Supports PDF, JPG, PNG, MP4 formats with automatic blockchain registration
- Blockchain Integration: Each evidence file gets a unique hash registered on blockchain
- Role-based Access: Users can be 'user', 'auditor', or 'admin' with different permissions
- Team Management: Admins can invite members and assign roles
- Audit Logging: Comprehensive tracking of all system activities
- Evidence Tracking: Real-time status updates on blockchain verification

Be helpful, concise, and focus on practical guidance. If users ask about features not mentioned, suggest they check the relevant page or contact support.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI with message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('OpenAI response received:', assistantMessage);

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
