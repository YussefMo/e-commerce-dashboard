import { db } from '@/firebase/admin';
import { tool } from 'ai';
import { z } from 'zod';
import { getAllUsers, getCurrentUser } from './action/auth.action';
import { deleteProduct, getAllProducts } from './action/product.action';
import { getAllOrders } from './action/orders.action';

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

export const deleteProductTool = tool({
  description:
    'based on product name you will delete it from the db only use it when user asks about deleting a specific product',
  parameters: z.object({
    productName: z
      .string()
      .optional()
      .describe(
        `The name of the product to search for. If not provided don't go any further in this tool`
      )
  }),
  execute: async ({ productName }) => {
    try {
      const user = await getCurrentUser();
      const isAdmin = user?.role === 'admin';
      if (isAdmin) {
        let productsData: any[] = [];
        const productsRef = db.collection('products');
        let queryVar;

        if (productName) {
          queryVar = productsRef.where('productName', '==', productName);
        } else {
          return `you did't provide a product name`;
        }

        const querySnapshot = await queryVar.get();
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        if (productsData.length > 0) {
          await deleteProduct(productsData[0].id, productsData[0].imageUrls);
        }

        return `product ${productName} deleted successfully`;
      } else {
        return `sorry you're not an admin to preform this action`;
      }
    } catch {
      return `There was an error trying to fetch or delete product details. Please try again later.`;
    }
  }
});

export const analyzeProductTool = tool({
  description:
    'based on product name you will analyze it and provide a summary of it and points for improvements',
  parameters: z.object({
    productName: z
      .string()
      .optional()
      .describe(
        `The name of the product to search for. If not provided don't go any further in this tool`
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

export const dataAnalysisTool = tool({
  description:
    'based on all the data passed to you users, products and orders you will preform som data analysis and provide a summary of it, what is the most selling product and etc you have the freedom to do what is necessary for this data and provide points for improvements',
  parameters: z.object({
    data: z
      .string()
      .optional()
      .describe(
        `The data to search for. If not provided go further and execute this tool`
      )
  }),
  execute: async () => {
    try {
      const orders = getAllOrders();
      const products = getAllProducts();
      const users = getAllUsers();
      const data = await Promise.all([orders, products, users]);
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      console.error('Error fetching product details from Firestore:', error);
      return 'There was an error trying to fetch data. Please try again later.';
    }
  }
});
