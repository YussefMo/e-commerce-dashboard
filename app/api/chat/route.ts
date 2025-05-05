import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, pageContext } = await req.json();
  const formattedPageContext =
    typeof pageContext === 'object' ? JSON.stringify(pageContext) : pageContext;

  const result = streamText({
    model: google('gemini-2.0-flash-001'),
    system:
      `${
        formattedPageContext
          ? `TASK: You are a helpful e-commerce assistant currently focused on this data you received '${formattedPageContext}'. 
        Base all your assistance on this specific page.`
          : 'TASK: You are a helpful e-commerce assistant for the admin dashboard.'
      }\n\nRULES:\n` +
      '- Reply in the same language as the user.\n' +
      '- If the request is unrelated to e-commerce, respond with: "I am not able to help you with that."\n' +
      '- Provide concise, direct answers focusing on the main points.\n' +
      '- Maintain a professional and friendly tone.\n' +
      `- If the request related to adding a new product, you will be a sales and marketing expert how is specialized in making sure the product is added to the website with the best SEO and conversions and generate the best related product description and tags for the product make sure the description don't exceed 250 words and not less than 150 words and make sure to use the best modern and attractive ways for the description and for the tags use one or tow words to describe the related product in simple efficient way.\n`,
    messages,
    maxSteps: 3
  });

  return result.toDataStreamResponse();
}
