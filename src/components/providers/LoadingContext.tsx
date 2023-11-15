import React, { createContext, useState, ReactNode } from 'react';

// Define una interfaz para el contexto
interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Crea el contexto con un valor inicial tipado
export const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => {},
});

// Define una interfaz para las props de LoadingProvider
interface LoadingProviderProps {
  children: ReactNode;
}

// Aplica la interfaz a las props del componente
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
