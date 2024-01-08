import React,{useState,useEffect,useContext} from "react";
import { ModalContext } from "../context/ModalProvider";
import './SettingsEdition.css'
const SettingsEdition:React.FC = ()=>{
    type GeneralFilterFunction = (...args: any[]) => number[][][];
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error("Component must be wrapped within a ModalProvider");
      }
      const [rangeValuestwo, setRangeValuestwo] = useState<Record<string, number>>({});  
      const [objTstwo,setObjTstwo] = useState(Object);
      const [settingsLenghttwo] = useState(modalContext.optFilter.SettingsTypeSpecial.length);
      useEffect(() => {
        const initialRangeValues: Record<string, number> = {};
        
          modalContext.optFilter.SettingsTypeSpecial.forEach((setting:any) => {
            setting?.rangeSettings.forEach((rangeSetting:any) => {
              initialRangeValues[rangeSetting.id] = rangeSetting.defaultVal; // Valor inicial
            });
          });
          setRangeValuestwo(initialRangeValues);
        
      
      }, []);
      useEffect(() => {
        if (objTstwo !== null && objTstwo.rangeSettings) {
          var currentGammaValues = [...modalContext.gammaValues];
          objTstwo.rangeSettings.forEach((element:any, index:number) => {
            currentGammaValues[index] = rangeValuestwo[element.id];
          });
          modalContext.setGammaValues(currentGammaValues);
          selectFilter(objTstwo?.filtro)
        }
      }, [rangeValuestwo,objTstwo]);
      const handleChange = (id: string, value: number) => {
        //NUEVO BLOQUE
        
        //FIN
         setRangeValuestwo((prevValues) => ({
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
           modalContext.optFilter.SettingsTypeSpecial.length !== 0?modalContext.optFilter.SettingsTypeSpecial.map((sett:any,j:number)=>(

            <div key={j} className="fire-settings" id={`Bfire-settings${j}`} onClick={()=>{
              modalContext.setIsSettings(true)
              if(objTstwo !== null){
                setObjTstwo(null)
              }
              
              
              
                document.getElementById(`Bfire-settings${j}`)?.classList.add("active")
                document.getElementById("sums")?.classList.add("inactive");
                document.getElementById("FIRE")?.classList.add("R");
                document.getElementById("minus")?.classList.add("inactive");
                document.getElementById(`BAction${j}`)?.classList.add("active")
                
                for(var k=0;k<modalContext.optFilter.SettingsTypeSpecial.length;k++){
                        if(k !==j){
                         
                          document.getElementById(`Bfire-settings${k}`)?.classList.remove("active")
                          document.getElementById(`Bfire-settings${k}`)?.classList.add("ocultar")
                          document.getElementById(`BAction${k}`)?.classList.remove("active")
                          document.getElementById(`BAction${k}`)?.classList.add("ocultar")
                        }
                }
                console.log("SSSDDDDDDD"+JSON.stringify(rangeValuestwo));
                setObjTstwo(sett)

                
             
            }}>
              <span>{sett?.nameFilter}  <i className="bi bi-sliders"></i></span>
              <div className="Action" id={`BAction${j}`}>
              {
                sett?.rangeSettings.map((rang:any) => {
                  const currentValue = rangeValuestwo[rang.id] || rang.defaultVal;
                  
                  const width = (200 / rang.range) * (currentValue || rang.defaultVal);
                 
                  return (
                    <React.Fragment key={rang.id}>
                      <div className="retion">
                      <div className="retionuno">
                      <p>{rang.nombre}</p>
                      </div>
                      <div className="retiondos">
                      {rang.wTitle !== ''?<div className="GrTitle"><p>{rang.wTitle}</p></div>:null}  
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
                   document.getElementById(`Bfire-settings${j}`)?.classList.remove("active");
                   document.getElementById("FIRE")?.classList.remove("active");
                   document.getElementById("FIRE")?.classList.remove("R");
                   document.getElementById("minus")?.classList.add("inactive");
                   document.getElementById(`BAction${j}`)?.classList.remove("active")
                   document.getElementById("sums")?.classList.remove("inactive");
                   for(var k = 0 ; k < modalContext.optFilter.SettingsTypeSpecial.length; k++){
                    document.getElementById(`Bfire-settings${k}`)?.classList.remove("ocultar");
                    document.getElementById(`BAction${k}`)?.classList.remove("ocultar")
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
        </>
    );
}
export default SettingsEdition;