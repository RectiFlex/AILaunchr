import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 requests per minute
});

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request) {
  try {
    // Extract IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    const { prompt, type, context } = await req.json();

    // System prompts for different types of requests
    const systemPrompts = {
      contract: `You are an expert blockchain developer specializing in creating secure smart contracts.
        Consider security best practices, gas optimization, and standard compliance.`,
      audit: `You are a smart contract security auditor. Analyze contracts for vulnerabilities,
        following established security patterns and best practices.`,
      tokenomics: `You are a tokenomics expert. Provide analysis and recommendations for token
        distribution, vesting schedules, and economic models.`
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompts[type as keyof typeof systemPrompts] || systemPrompts.contract
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      stream: true,
    });

    // Create a streaming response
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: error.status || 500 }
    );
  }
}