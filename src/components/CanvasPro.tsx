import React from "react";
import "./styles/CanvasPro.css"
const CanvasPro:React.FC =  ()=>{
    function rangeSlider(valuess: string) {
        const elemento = document.getElementById('range') as HTMLInputElement;
        if (elemento) {
            elemento.value = valuess;
        }
    }
    
    function valueSlider(e: React.ChangeEvent<HTMLInputElement>) {
        const econd = e.target.value;
        
        const finalElemento = document.getElementById('final') as HTMLInputElement;
        if (finalElemento) {
            finalElemento.value = econd;
        }
    }


   return(
    <div className="ContenedorCnavas">
      
    </div>
    
   );
}
export default CanvasPro;