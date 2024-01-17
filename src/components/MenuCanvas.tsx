import React, { useState,useContext,useEffect } from 'react';
import { ModalContext } from './context/ModalProvider';
import './styles/MenuCanvas.css';

const MenuCanvas: React.FC = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  const [sliderValue, setSliderValue] = useState<number>(modalContext.zoom);
  const maxSliderValue = 400; // Define el máximo valor para el slider
  const maxWidth = 300; // El máximo ancho que #selector puede tener
  const [origin,setOrigin] = useState<boolean>(true);
  const [graf,setGraf] = useState<boolean>(true);
  useEffect(() => {
    setSliderValue(modalContext.zoom);
  }, [modalContext.zoom]);
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
    modalContext.setZoom(Number(event.target.value))
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);
    newValue = Math.max(0, Math.min(newValue, maxSliderValue)); // Asegúrate de que el valor esté entre 0 y el máximo
    setSliderValue(newValue);
    modalContext.setZoom(newValue);
  };

  // Calcula el ancho en píxeles
  const selectorWidth = Math.min((sliderValue / maxSliderValue) * maxWidth, maxWidth);

  return (
    <div className="menu-canvas">
      {/* ... tus otros elementos ... */}
      {origin? <div className="item-canv1" id="Original" onClick={()=>{
        document.getElementById("Origin")?.classList.remove("active")
        setOrigin(false);
            }} onMouseMove={()=>{
                document.getElementById("Origin")?.classList.add("active")
            }}
            onMouseOut={()=>{
                document.getElementById("Origin")?.classList.remove("active")
            }}
            >
                    <div className="Hovr" id="Origin">Ver Original</div>
                    <i className="bi bi-eye"></i>
              </div>
             :<div className="item-canv1" id="Original" onClick={()=>{
                document.getElementById("Origin2")?.classList.remove("active")
                setOrigin(true);
             }}
             onMouseMove={()=>{
                document.getElementById("Origin2")?.classList.add("active")
             }}
             onMouseOut={()=>{
                document.getElementById("Origin2")?.classList.remove("active")
             }}
             >
                    <div className="Hovr" id="Origin2">Atras</div>
                    <i className="bi bi-eye-slash"></i>
              </div>  }
              {graf? <div className="item-canv1" id="Original" onClick={()=>{
        document.getElementById("Origin3")?.classList.remove("active")
        setGraf(false);
            }} onMouseMove={()=>{
                document.getElementById("Origin3")?.classList.add("active")
            }}
            onMouseOut={()=>{
                document.getElementById("Origin3")?.classList.remove("active")
            }}
            >
                    <div className="Hovr" id="Origin3">Ver Grafica</div>
                    <i className="bi bi-graph-up-arrow"></i>
              </div>
             :<div className="item-canv1" id="Original" onClick={()=>{
                document.getElementById("Origin4")?.classList.remove("active")
                setGraf(true);
             }}
             onMouseMove={()=>{
                document.getElementById("Origin4")?.classList.add("active")
             }}
             onMouseOut={()=>{
                document.getElementById("Origin4")?.classList.remove("active")
             }}
             >
                    <div className="Hovr" id="Origin4">Atras</div>
                    <i className="bi bi-graph-down-arrow"></i>
              </div>  }
     

      <div className="item-canv2">
        <div className="main">
          <input
            type="range"
            min="0"
            step="0.1"
            max={maxSliderValue}
            id="final"
            value={sliderValue}
            className="range"
            onChange={handleSliderChange}
          />
          {/* Aplica el ancho calculado al selector, no permitiendo que supere los 300px */}
          <div id="selector" style={{ width: `${selectorWidth}px` }}></div>
          <div id="fondo"></div>
        </div>
        <div className="valr">
          <input
            id="range"
            type="number"
            value={sliderValue}
            onChange={handleInputChange}
            className="valri"
            
          />
          <div className="porchento">%</div>
        </div>
      </div>
    </div>
  );
};

export default MenuCanvas;
