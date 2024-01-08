import React,{useState,useEffect,useContext} from "react";
import { ModalContext } from "../context/ModalProvider";
import './Settings.css'
const Settings:React.FC = () =>{
      type GeneralFilterFunction = (...args: any[]) => number[][][];
      const modalContext = useContext(ModalContext);
      if (!modalContext) {
          throw new Error("Component must be wrapped within a ModalProvider");
        }
      const [rangeValues, setRangeValues] = useState<Record<string, number>>({});  
      const [objTs,setObjTs] = useState(Object);
      const [ settingsLenght] = useState(modalContext.optFilter.Settings.length)
      useEffect(() => {
            const initialRangeValues: Record<string, number> = {};
            
              modalContext.optFilter.Settings.forEach((setting:any) => {
                setting?.rangeSettings.forEach((rangeSetting:any) => {
                  initialRangeValues[rangeSetting.id] = rangeSetting.defaultVal; // Valor inicial
                });
              });
              setRangeValues(initialRangeValues);
            
          
          }, []);
          useEffect(() => {
            if (objTs !== null && objTs.rangeSettings) {
              var currentGammaValues = [...modalContext.gammaValues];
              objTs.rangeSettings.forEach((element:any, index:number) => {
                currentGammaValues[index] = rangeValues[element.id];
              });
              modalContext.setGammaValues(currentGammaValues);
              selectFilter(objTs?.filtro)
            }
          }, [rangeValues,objTs]);
          const handleChange = (id: string, value: number) => {
            //NUEVO BLOQUE
            
            //FIN
             setRangeValues((prevValues) => ({
               ...prevValues,
               [id]: value
         
             }));
         
             
           };
           const selectFilter = (filterFunc: GeneralFilterFunction | null | undefined) => {
             if (typeof filterFunc === 'function') {
               modalContext.setSelectedFilter(filterFunc);
             } else {
               // Manejar la situación en la que filterFunc no es una función
               console.error("El filtro seleccionado no es una función válida.");
             }
           };
      return(
      <>
      {
           modalContext.optFilter.Settings.length !== 0?modalContext.optFilter.Settings.map((sett:any,j:number)=>(

            <div key={j} className="fire-settings" id={`fire-settings${j}`} onClick={()=>{
              modalContext.setIsSettings(true)
              if(objTs !== null){
                setObjTs(null)
              }
              
              
              
              document.getElementById(`fire-settings${j}`)?.classList.add("active")
              document.getElementById("sums")?.classList.add("inactive");
                document.getElementById("FIRE")?.classList.add("R");
                document.getElementById("minus")?.classList.add("inactive");
                document.getElementById(`Action${j}`)?.classList.add("active")
                
                for(var k=0;k<settingsLenght;k++){
                        if(k !==j){
                         
                          document.getElementById(`fire-settings${k}`)?.classList.remove("active")
                          document.getElementById(`fire-settings${k}`)?.classList.add("ocultar")
                          document.getElementById(`Action${k}`)?.classList.remove("active")
                          document.getElementById(`Action${k}`)?.classList.add("ocultar")
                        }
                }
                console.log("SSSDDDDDDD"+JSON.stringify(rangeValues));
                setObjTs(sett)

                
             
            }}>
              <span>{sett?.nameFilter}  <i className="bi bi-sliders"></i></span>
              <div className="Action" id={`Action${j}`}>
              {
                sett?.rangeSettings.map((rang:any) => {
                  const currentValue = rangeValues[rang.id] || rang.defaultVal;
                  
                  const width = (200 / rang.range) * (currentValue || rang.defaultVal);
                 
                  return (
                    <React.Fragment key={rang.id}>
                      <div className="retion">
                      <div className="retionuno">
                      <p>{rang.nombre}</p>
                      </div>
                      <div className="retiondos">
                      <input
                        className="ValorGamma"
                        type="number"
                        min={rang.min}
                        max={rang.range}
                        step={rang.step}
                        value={currentValue || rang.defaultVal}
                        onChange={e => handleChange(rang.id, Number(e.target.value))}
                      />
                      </div>
                      </div>
                     
                
                      <div className="main2">
                        <input
                          type="range"
                          
                          max={rang.range}
                          step={rang.step}
                          value={currentValue || rang.defaultVal}
                          
                          className="range2"
                          onChange={e => handleChange(rang.id, Number(e.target.value))}
                        />
                        <div
                          className="selector2"
                          style={{ width: `${width}px` }}
                          
                        ></div>
                        <div className="fondo2"></div>
                      </div>
                    </React.Fragment>
                  );
                })
                
              
              }
  
            
  
              <div className="Actions-CA">
                  <div className="Bca cancel" id="cancel"
                  onClick={(e)=>{
                    e.stopPropagation();
                    modalContext.setGammaValues([])
                   document.getElementById(`fire-settings${j}`)?.classList.remove("active");
                   document.getElementById("FIRE")?.classList.remove("active");
                   document.getElementById("FIRE")?.classList.remove("R");
                   document.getElementById("minus")?.classList.add("inactive");
                   document.getElementById(`Action${j}`)?.classList.remove("active")
                   document.getElementById("sums")?.classList.remove("inactive");
                   for(var k = 0 ; k < settingsLenght ; k++){
                    document.getElementById(`fire-settings${k}`)?.classList.remove("ocultar");
                    document.getElementById(`Action${k}`)?.classList.remove("ocultar")
                   }
                   modalContext.setIsSettings(false);
                   modalContext.setToBack(1)
                  }}
                  
                  ><p>Cancelar</p></div>
                  <div className="Bca apli" id="Apli"><p>Aplicar</p></div>
              </div>
          </div>
  
            </div>

           )):null 
         
          }

      </>);
}
export default Settings;