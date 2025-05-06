import { db } from '@/firebase/admin';
import { tool } from 'ai';
import { z } from 'zod';

export const getProductDetailsTool = tool({
  description: `Get details for a specific product or a list of products from the Firestore database. 
    Use this if the user asks about product availability, price, description, or any other product-specific information.`,
  parameters: z.object({
    productName: z
      .string()
      .optional()
      .describe(
        'The name of the product to search for. If not provided, will try to list some available products.'
      )
  }),
  execute: async ({ productName }) => {
    try {
      let productsData: any[] = [];
      const productsRef = db.collection('products');
      let queryVar;

      if (productName) {
        queryVar = productsRef.where('productName', '==', productName);
      } else {
        queryVar = productsRef;
      }

      const querySnapshot = await queryVar.get();
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });

      if (productsData.length === 0) {
        return productName
          ? `No product found matching the name "${productName}".`
          : 'No products found. The product catalog might be empty or there was an issue fetching them.';
      }
      return JSON.stringify(productsData);
    } catch (error) {
      console.error('Error fetching product details from Firestore:', error);
      return 'There was an error trying to fetch product details. Please try again later.';
    }
  }
});
