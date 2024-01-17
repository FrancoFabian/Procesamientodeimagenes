import React, { useState,useEffect, createContext, Dispatch, SetStateAction, ReactNode } from 'react';
import { optionsObject } from '../model/OptionsFilter';
import { OptionObject } from '../model/OptionsFilter';
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
  optFilter:OptionObject;
  setOptFilter:Dispatch<SetStateAction<OptionObject>>;
  imgComposite: File | null;
  setImgComposite: Dispatch<SetStateAction<File | null>>;
  zoom:number;
  setZoom:Dispatch<SetStateAction<number>>;
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
  const [imgComposite,setImgComposite] = useState<File | null>(null);
  const [zoom,setZoom] = useState(0);
  const updateSelectedFilter = (newFilterFunction: GeneralFilterFunction) => {
    setSelectedFilter(() => {
      return (...args: any[]) => {
        return newFilterFunction(...args, gammaValues);
      };
    });
  };
  useEffect(() => {
    setOptFilter(optionsObject[optionsGen]);
  }, [optionsGen]);
  

  const value = {
    isOpen, setIsOpen, 
    image, setImage,
    selectedFilter, setSelectedFilter: updateSelectedFilter,
    isSettings, setIsSettings,
    gammaValues, setGammaValues,
    toBack,setToBack,
    optionsGen,setOptionsGen,
    optFilter,setOptFilter,
    imgComposite,setImgComposite,
    zoom,setZoom
  };
  console.log("IMAGEN PARA FILTRO : "+imgComposite)
  console.log("SIDEMENUS : "+optionsGen)
  console.log(optFilter)
  console.log("backtoORIGINAL"+toBack)
  console.log("EL GAMMMA"+gammaValues)
  console.log("ESTADO EN EL CONTEXTO: " + selectedFilter?.toString());
  console.log("SETTINGS"+isSettings)
  console.log("ZOOMM"+zoom)
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
