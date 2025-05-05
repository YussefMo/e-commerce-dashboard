'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [pageContextData, setPageContextData] = useState<any>(null);

  return (
    <PageContext.Provider value={{ pageContextData, setPageContextData }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }
  return context;
};
