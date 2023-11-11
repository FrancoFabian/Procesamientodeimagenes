import React from 'react';

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
      <ModalContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </ModalContext.Provider>
    );
  };
  
