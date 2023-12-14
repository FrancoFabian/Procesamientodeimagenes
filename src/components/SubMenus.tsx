import React,{useState,useEffect,useContext,useRef} from "react";
import { ModalContext } from "./context/ModalProvider";
import './styles/SubMenus.css'
import { optionsObject } from "./model/OptionsFilter";
import { ImageType } from "./filters/ImageType";
import TamRenderCanvas from "./model/TamRenderCanvas";
const SubMenus: React.FC = () => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  const {isOpen,setIsOpen} = modalContext;
  const [rangeValues, setRangeValues] = useState<Record<string, number>>({});
  const [optionFilter,setOptionFilter] = useState(optionsObject[0]);
  const [tamLenght,setLenght] = useState(optionFilter.canvasI.length - 1);
  const [bandAction,setBandAction] = useState(100);
  const [ settingsLenght,setSettingsLenght] = useState(optionsObject[0].Settings.length)
  
  useEffect(() => {
    const initialRangeValues: Record<string, number> = {};
    optionsObject[0].Settings.forEach(setting => {
      setting?.rangeSettings.forEach(rangeSetting => {
        initialRangeValues[rangeSetting.id] = 0; // Valor inicial
      });
    });
    setRangeValues(initialRangeValues);
  }, []);
  

  useEffect(() => {
    if (modalContext.image instanceof File) {
      const file = modalContext.image;
      const imageUrl = URL.createObjectURL(file);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        canvasRefs.current.forEach((canvas, index) => {
          if (canvas) {
            console.log("estos son los ID :"+canvas.id)
            const ctx = canvas.getContext('2d',{ willReadFrequently: true });
            const filtro = optionFilter.canvasI[index].filtro;
            if (ctx && typeof filtro === 'function') {
              
              console.log("medidasInicialescanvas: "+canvas.width+" | "+canvas.height)
              canvas.width = 200;
              canvas.height = 200;
              const newTam = new TamRenderCanvas(img.width,img.height,canvas.width,canvas.height);
              const medidas = newTam.newTam();
              console.log(medidas)
              canvas.width = medidas.N_canvasWidth;
              canvas.height = medidas.N_canvasHeight;
              canvas.style.width = `${medidas.N_canvasWidth}px`;
              canvas.style.height = `${medidas.N_canvasHeight}px`;
              document.getElementById(canvas.id+`${index}`)!.style.width = `${medidas.N_canvasWidth}px`;
              
              console.log("Canvas Width : "+ canvas.width+"Canvas Height : "+canvas.height)
              ctx.clearRect(0, 0, medidas.N_canvasWidth, medidas.N_canvasHeight);
              ctx.drawImage(img, 0, 0, medidas.N_imgWidth, medidas.N_imgHeight);
  
              // Crea una instancia de ImageType y aplica el filtro
              try {
                const imageType = new ImageType(ctx, img, canvas.width, canvas.height);
                const filteredImage = filtro(imageType);
                imageType.imageArray2DtoData(ctx, filteredImage);
              } catch (error) {
                console.error("Error al aplicar el filtro:", error);
              }
            }
          }
        });
      };
      img.onerror = () => {
        console.error("Error al cargar la imagen:", img.src);
      };
    }
  }, [modalContext.image, optionFilter.canvasI]);
  

  const handleChange = (id: string, value: number) => {
    setRangeValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };
    return(
        <div className="sub-menus" id="sub-menus" onClick={()=>{setIsOpen(false)}}>
         <div className="see-plus inactive" id="minus" onClick={()=>{
          document.getElementById("minus")?.classList.add("inactive");
          document.getElementById("sums")?.classList.remove("inactive");
          document.getElementById("FIRE")?.classList.remove("active");
         }}>
            <div className="bar"></div>
            <div className="select-plus">
            <span><i className="bi bi-dash-circle"></i> </span>
            <i className="bi bi-eye"></i>
            </div>
            
          </div>  
          
            <div className="fill-fire" id="FIRE">
              {
                optionFilter.canvasI.map((opt,i)=>(
                  <div id={opt.canvasId+i} className="mark-fire" key={i}>
                    <canvas
                    ref={el => canvasRefs.current[i] = el}
                     id={opt.canvasId}
                     width={opt.widthC}
                     height={opt.heightC}
                     ></canvas>
                    <span>{opt.nameFilter}</span>
                  </div>
              ))
                }
            </div>
           
          
         
        <div className="see-plus" id="sums" onClick={()=>{
              document.getElementById("minus")?.classList.remove("inactive");
              document.getElementById("sums")?.classList.add("inactive");
              document.getElementById("FIRE")?.classList.add("active");
        }}>
            <div className="bar"></div>
            <div className="select-plus">
            <i className="bi bi-eye"></i>
            <span> {tamLenght}<i className="bi bi-plus"></i></span>
            </div>
            
          </div>  
          {
           optionFilter.Settings.map((sett,j)=>(

            <div key={j} className="fire-settings" id={`fire-settings${j}`} onClick={()=>{
              document.getElementById(`fire-settings${j}`)?.classList.add("active")
              document.getElementById("sums")?.classList.add("inactive");
                document.getElementById("FIRE")?.classList.add("R");
                document.getElementById("minus")?.classList.add("inactive");
                document.getElementById(`Action${j}`)?.classList.add("active")
                
                for(var k=0;k<settingsLenght;k++){
                        if(k !==j){
                          console.log('INDICE : '+k)
                          document.getElementById(`fire-settings${k}`)?.classList.remove("active")
                          document.getElementById(`fire-settings${k}`)?.classList.add("ocultar")
                          document.getElementById(`Action${k}`)?.classList.remove("active")
                          document.getElementById(`Action${k}`)?.classList.add("ocultar")
                        }
                }
              
            }}>
              <span>{sett?.nameFilter}  <i className="bi bi-sliders"></i></span>
              <div className="Action" id={`Action${j}`}>
              {
                sett?.rangeSettings.map((rang) => {
                  const currentValue = rangeValues[rang.id] || 0;
                  const width = (200 / rang.range) * currentValue;
                
                  return (
                    <React.Fragment key={rang.id}>
                      <p>{rang.nombre}</p>
                      <input
                        className="ValorGamma"
                        type="number"
                        value={currentValue}
                        onChange={e => handleChange(rang.id, Number(e.target.value))}
                      />
                
                      <div className="main2">
                        <input
                          type="range"
                          min="0"
                          max={rang.range}
                          value={currentValue}
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
  
                  }}
                  ><p>Cancelar</p></div>
                  <div className="Bca apli" id="Apli"><p>Aplicar</p></div>
              </div>
          </div>
  
            </div>

           )) 
         
          }
      </div>
      
    );
}
export default SubMenus;