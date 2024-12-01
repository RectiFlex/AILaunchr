```typescript
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { code, type } = await req.json();

  const systemPrompts = {
    security: `Analyze this smart contract for security vulnerabilities. Focus on:
      1. Reentrancy vulnerabilities
      2. Integer overflow/underflow
      3. Access control issues
      4. Gas limitations
      5. Front-running possibilities`,
    gas: `Analyze this smart contract for gas optimization opportunities. Focus on:
      1. Storage optimization
      2. Loop optimization
      3. Function optimization
      4. State variable access patterns`,
    audit: `Perform a comprehensive smart contract audit. Include:
      1. Security vulnerabilities
      2. Gas optimization
      3. Code quality
      4. Best practices
      5. Documentation completeness`
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: systemPrompts[type as keyof typeof systemPrompts]
      },
      {
        role: 'user',
        content: code
      }
    ],
    temperature: 0.3,
    max_tokens: 4000,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```