import {
  analyzeProductTool,
  dataAnalysisTool,
  deleteProductTool,
  getProductDetailsTool
} from '@/lib/ai.tools';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, pageContext } = await req.json();

  const formattedPageContext =
    typeof pageContext === 'object' ? JSON.stringify(pageContext) : pageContext;

  // Check if user intends a search-based task
  const lastUserMessage =
    messages[messages.length - 1]?.content?.toLowerCase() || '';
  const enableSearch =
    lastUserMessage.includes('search') ||
    lastUserMessage.includes('trends') ||
    lastUserMessage.includes('trend') ||
    lastUserMessage.includes('trendy') ||
    lastUserMessage.includes('web');

  const result = streamText({
    tools: {
      getProductDetails: getProductDetailsTool,
      deleteProduct: deleteProductTool,
      analyzeProduct: analyzeProductTool,
      dataAnalysis: dataAnalysisTool
    },
    model: google('gemini-2.0-flash-001', {
      ...(enableSearch && { useSearchGrounding: true }) // only enable when needed
    }),
    system:
      `${
        formattedPageContext
          ? `TASK: You are a helpful e-commerce assistant currently focused on this data you received '${formattedPageContext}'. 
        Base all your assistance on this specific page.`
          : `TASK: You are a helpful e-commerce assistant for the admin dashboard.
        You have access to tools like 'getProductDetails'. ALWAYS consider using your tools to answer user queries, especially for product information or other e-commerce tasks. If a query can be addressed by a tool, prioritize using it, particularly when page context is not available.`
      }\n\nRULES:\n` +
      '- Reply in the same language as the user.\n' +
      '- If the request is unrelated to e-commerce, respond with: "I am not able to help you with that."\n' +
      '- If the request is related to web searching about product improvement or e-commerce trends, proceed with the search and provide the necessary information.\n' +
      '- Provide concise, direct answers focusing on the main points.\n' +
      '- Maintain a professional and friendly tone.\n' +
      `- If the request is related to adding a new product and the provided context is about the same request, 
      you will be a sales and marketing expert who is specialized in making sure the product is added to the website
      with the best SEO and conversions. Generate the best related product description and tags in raw text (no special characters).
      Description must be between 150–250 words using modern and attractive style. Tags must be 1–2 words, simple and efficient.\n` +
      `- If the prompt starts with 'tool', only use a tool related to the prompt.\n` +
      '- If the user asks any question related to a product, use `getProductDetails` tool. You can provide a `productName` or call without parameters to get a general list.\n' +
      '- If the product is not in the database, respond with: "I am sorry, I could not find that product."\n' +
      '- If the request is related to any type of analysis, you are a **data scientist agent** who can observe data patterns and perform advanced analysis.\n' +
      '- Always respond in raw text format. Use **markdown** tags (e.g., `**`) and new lines for clarity. Do **not** return raw JSON or developer-oriented responses unless requested.\n' +
      '- Format tool data output for clarity and readability for end users.\n',
    messages,
    maxSteps: 3
  });

  return result.toDataStreamResponse();
}
