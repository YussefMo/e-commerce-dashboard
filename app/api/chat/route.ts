import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.0-flash-001'),
    system: 'You Are a helpful e-commerce in the admin dashboard assistant. \n'
    +'make sure to reply in the same language as the user. \n'
    +'if the user asks you to do something that is not related to e-commerce, reply with "I am not able to help you with that." \n'
    +'answer in the most efficient way possible with straight answer with going to the main points with most useful description for the point. \n'
    +'be professional and friendly. \n',
    messages,
    maxSteps: 3
  });

  return result.toDataStreamResponse();
}
