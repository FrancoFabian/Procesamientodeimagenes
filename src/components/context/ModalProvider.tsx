import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react';
import { optionsObject } from '../model/OptionsFilter';
type GeneralFilterFunction = (...args: any[]) => number[][][];

export interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  selectedFilter: GeneralFilterFunction | null;
  setSelectedFilter: (newFilterFunction: GeneralFilterFunction) => void; // Cambiado aquí
  isSettings: boolean;
  setIsSettings: Dispatch<SetStateAction<boolean>>;
  gammaValues: number[];
  setGammaValues: Dispatch<SetStateAction<number[]>>;
  toBack:number;
  setToBack: Dispatch<SetStateAction<number>>;
  optionsGen:number;
  setOptionsGen:Dispatch<SetStateAction<number>>;
  optFilter:any;
  setOptFilter:Dispatch<SetStateAction<any>>;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode; // Aquí está el tipo para children
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isSettings, setIsSettings] = useState(false);
  const [gammaValues, setGammaValues] = useState<number[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<GeneralFilterFunction | null>(null);
  const [toBack,setToBack] = useState(0);
  const [optionsGen,setOptionsGen] = useState(0);
  const [optFilter,setOptFilter] = useState(optionsObject[optionsGen])
  const updateSelectedFilter = (newFilterFunction: GeneralFilterFunction) => {
    setSelectedFilter(() => {
      return (...args: any[]) => {
        return newFilterFunction(...args, gammaValues);
      };
    });
  };

  const value = {
    isOpen, setIsOpen, 
    image, setImage,
    selectedFilter, setSelectedFilter: updateSelectedFilter,
    isSettings, setIsSettings,
    gammaValues, setGammaValues,
    toBack,setToBack,
    optionsGen,setOptionsGen,
    optFilter,setOptFilter
  };
  console.log("backtoORIGINAL"+toBack)
  console.log("EL GAMMMA"+gammaValues)
  console.log("ESTADO EN EL CONTEXTO: " + selectedFilter?.toString());
  console.log("SETTINGS"+isSettings)
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
