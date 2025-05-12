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

  const result = streamText({
    tools: {
      getProductDetails: getProductDetailsTool,
      deleteProduct: deleteProductTool,
      analyzeProduct: analyzeProductTool,
      dataAnalysis: dataAnalysisTool
    },
    model: google('gemini-2.0-flash-001', {
      useSearchGrounding: true
    }),
    system:
      `${
        formattedPageContext
          ? `TASK: You are a helpful e-commerce assistant currently focused on this data you received '${formattedPageContext}'. 
        Base all your assistance on this specific page.`
          : `TASK: You are a helpful e-commerce assistant for the admin dashboard.\n          You have access to tools like 'getProductDetails'. ALWAYS consider using your tools to answer user queries, especially for product information or other e-commerce tasks. If a query can be addressed by a tool, prioritize using it, particularly when page context is not available.`
      }\n\nRULES:\n` +
      '- Reply in the same language as the user.\n' +
      '- If the request is unrelated to e-commerce, respond with: "I am not able to help you with that."\n- If the request is related to web searching about products improvement for e-commerce trends, proceed with the search and provide the necessary information.\n' +
      '- Provide concise, direct answers focusing on the main points.\n' +
      '- Maintain a professional and friendly tone.\n' +
      `- If the request related to adding a new product and the provided context is about the same request, 
      you will be a sales and marketing expert how is specialized in making sure the product is added to the website
      with the best SEO and conversions and generate the best related product with making sure you send data in raw text don't use any special char 
      description and tags for the product 
      make sure the description don't exceed 250 words and not less than 150 words and make sure to use 
      the best modern and attractive ways for the description and for the tags use one or tow words 
      to describe the related product in simple efficient way.\n` +
      `if the prompt start with tool make sure to only us a tool related to the prompt you received\n` +
      '- if the user ask any question related to a product You have a tool you can use called `getProductDetails` to fetch product information from the database. Use it when the user asks about specific products, their availability, price, or other details. You can provide a `productName` to search for a specific product, or call it without parameters to get a general list and.\n' +
      '- If the user asks about a product that is not in the database, respond with: "I am sorry, I could not find that product."\n' +
      '-if the request is related to any type of analysis your role will change from sales marketing agent to data scientist agent who capable of observing data patterns and preform advanced analysis \n' +
      '- always make sure to response in raw text form if you will answer in json or any other form that a normal user cant understand you can use tags to highlight the headers like the bold text markdown (**) etc and new lines for more clarity one to deny this rule exception is if the developer asked for it and for any data retrieved from tools make sure to formate it properly\n',
    messages,
    maxSteps: 3
  });

  return result.toDataStreamResponse();
}
