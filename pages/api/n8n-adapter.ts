import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from 'ai';
import { getScreenshot } from '../../helpers/getScreenshot';
import { getDom } from '../../helpers/getDom';
import { sendToWebhook } from '../../helpers/sendToWebhook';
import { ActionItem } from '../../src/types';

// Type for the n8n webhook response
interface N8nResponse {
  respuestaChat: string;
  ui: ActionItem[];
}

// Type for the Vercel AI SDK response
interface VercelAIResponse {
  id: string;
  createdAt: number;
  choices: Array<{
    message: {
      role: "assistant";
      content: string;
    };
  }>;
  data?: {
    ui: ActionItem[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract messages from request body
    const { messages } = req.body as { messages: Message[] };
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Get the last user message
    const userMessage = messages
      .filter(msg => msg.role === 'user')
      .pop()?.content;

    if (!userMessage) {
      return res.status(400).json({ error: 'No user message found' });
    }

    // Capture screenshot and DOM in parallel
    const [screenshot, html] = await Promise.all([
      getScreenshot(),
      getDom()
    ]);

    // Send data to n8n webhook
    const n8nResponse = await sendToWebhook({
      userMessage,
      html,
      screenshot
    }) as N8nResponse;

    // Format response according to Vercel AI SDK
    const response: VercelAIResponse = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      choices: [
        {
          message: {
            role: "assistant",
            content: n8nResponse.respuestaChat
          }
        }
      ]
    };

    // Send response
    return res.status(200).json(response);

  } catch (error) {
    console.error('Error in n8n-adapter:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
} 