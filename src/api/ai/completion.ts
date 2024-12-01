```typescript
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt, projectContext } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an AI assistant specialized in blockchain development, smart contracts, and tokenomics. 
        You help developers create secure and efficient smart contracts, analyze tokenomics, and generate technical documentation.
        ${projectContext ? `Current project context: ${JSON.stringify(projectContext)}` : ''}`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```