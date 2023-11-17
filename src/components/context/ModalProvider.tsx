import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react';

export interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode; // Aquí está el tipo para children
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const value = { isOpen, setIsOpen, image, setImage };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
