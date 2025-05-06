/* eslint-disable no-unused-vars */
interface User {
  name: string;
  email: string;
  role: string;
  id: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface AddProductProp {
  productName: string;
  category: string;
  price: number;
  stock: number;
  discount?: number;
  description: string;
  tags: string[];
  imageUrls: string[];
  variety: Array<{
    type: string;
    options: string[];
  }>;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
}

interface PageContextProps {
  pageContextData: any;
  setPageContextData: (data: any) => void;
}
