import React, { useState,useEffect,useContext } from 'react';
import { ModalContext } from "./context/ModalProvider";
import './styles/SideMenu.css';

const SideMenu: React.FC = () => {
  const [isStark, setisStark] = useState(0);
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  const { isOpen, setIsOpen } = modalContext;
  
  
  const arrOptions: {nombre:String; icon:String}[]= [
          {nombre:"Básicas",icon:"bi bi-image-alt"},
          {nombre:"Edicion",icon:"bi bi-pencil-square"},
          {nombre:"Matematicas", icon:"bi bi-infinity"},
          {nombre:"Img.Compuestas", icon:"bi bi-stack"},
          {nombre:"Texto",icon:"bi bi-textarea-t"},
          {nombre:"Morofológicas",icon:"bi bi-node-plus-fill"},
          {nombre:"Sinteticas",icon:"bi bi-tools"},
          {nombre:"Geométricas",icon:"bi bi-circle-square"},
          {nombre:"Nuevas",icon:"bi bi-lightning-charge"}
          
  ];
  useEffect(()=>{
    if(isStark === 0){
        document.getElementById(`item${isStark}`)?.classList.add("coloractive");
        for (let index = 1; index < 9; index++) {
           
          document.getElementById(`item${index}`)?.classList.remove("coloractive")
        }
    }else{

      for (let index = 0; index < 9; index++) {
        if(index === isStark){
          document.getElementById(`item${isStark}`)?.classList.add("coloractive");
        }else{
          document.getElementById(`item${index}`)?.classList.remove("coloractive")
        }
           
        
      }


    }
    
},[isStark]);
  const Who:number = arrOptions.length;
  function abrirSidemenu(g:number){
          document.getElementById("side-menu")?.classList.add("active")
          for (let i = 0; i < g; i++) {
            document.getElementById(`item${i}`)?.classList.add("active")
          }
          
          
  }
  function closeSidemenu(g:number){
    document.getElementById("side-menu")?.classList.remove("active")
    for (let i = 0; i < g; i++) {
      document.getElementById(`item${i}`)?.classList.remove("active")
    }
  }
  return (
    <div className="side-menu" id="side-menu"  
    onMouseEnter={()=>abrirSidemenu(Who)} 
    onMouseLeave={()=>closeSidemenu(Who)}
    onClick={()=>{
      setIsOpen(false)
    }}
    >
      
       {
        arrOptions.map((areO,i)=>(
          <div 
           id={`item${i}`}
           className={`item-menu`} 
           key={i}
           onClick={()=> setisStark(i)}
           >
            
            <i className={areO.icon.toString()}/>
            <p>{areO.nombre}</p>
            
          </div>

        ))
       }
      
      
    </div>
  );
};

export default SideMenu;
