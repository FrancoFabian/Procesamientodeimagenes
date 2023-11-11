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
    <>
    <div className="options-canvas" id="options-canvas">
    <div className="canvac">
        <div className="canvaI" id="canvac">
            <canvas id="img1" className="inactiveSd"></canvas>
            <canvas id="imgOrigin" className="inactiveSd active"></canvas>
        </div>
        <div className="canvaH" id="canvaH">
            <div className="BtnH" id="BtnH">Cerrar</div>
            <div className="History">
                <h3>Histograma 1</h3>
                <canvas id="histograma1"></canvas>
            </div>
            <div className="History">
                <h3>Histograma 2</h3>
                <canvas id="histograma2"></canvas>
            </div>
        </div>
    </div>
    <div className="menu-canvas">
        <div className="item-canv1" id="Original">
            <div className="Hovr" id="Origin">Ver Original</div>
            {/* ... SVG para "bi-eye" ... */}
        </div>
        <div className="item-canv1 active" id="pcultar">
            <div className="Hovr" id="segar">Ocultar</div>
            {/* ... SVG para "bi-eye-slash" ... */}
        </div>
        <div className="item-canv" id="histogramas">
            <div className="Hovr" id="Ax">Histogramas</div>
            {/* ... SVG para "bi-clipboard-pulse" ... */}
        </div>
        <div className="item-canv2">
            <div className="main">
            <input 
                    type="range" 
                    min="0" 
                    max="400" 
                    id="final" 
                    value="200"  
                    className="range" 
                    onChange={e => rangeSlider(e.target.value)} 
                    onMouseMove={(e) => {
                        const elementoInput = e.target as HTMLInputElement;
                        rangeSlider(elementoInput.value);
                    }}
                />
                <div id="selector"></div>
                <div id="fondo"></div>
            </div>
            <div className="valr">
            <input 
                    id="range" 
                    type="number" 
                    onChange={valueSlider}
                    placeholder="200"  
                    className="valri"
                />
                <div className="porchento">%</div>
            </div>
        </div>
    </div>
</div>
<canvas id="Result"></canvas>

    </>
   );
}
export default CanvasPro;