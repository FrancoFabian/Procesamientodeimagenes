import React,{useEffect,useContext,useRef} from "react";
import { ModalContext } from "../context/ModalProvider";
import { ImageType } from "../filters/ImageType";
import TamRenderCanvas from "../model/TamRenderCanvas";
import './Previsualizaciones.css'
const Previsualizaciones:React.FC = () =>{
    type GeneralFilterFunction = (...args: any[]) => number[][][];
    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error("Component must be wrapped within a ModalProvider");
      }
    useEffect(() => {
        if (modalContext?.image instanceof File) {
          const file = modalContext.image;
          const imageUrl = URL.createObjectURL(file);
    
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            canvasRefs.current.forEach((canvas, index) => {
              if (canvas) {
                console.log("estos son los ID :"+canvas.id)
                const ctx = canvas.getContext('2d',{ willReadFrequently: true });
                const filtro = modalContext.optFilter.canvasI[index].filtro;
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
      }, [modalContext?.image, modalContext?.optFilter.canvasI]);
    const selectFilter = (filterFunc: GeneralFilterFunction | null | undefined) => {
        if (typeof filterFunc === 'function') {
          modalContext?.setSelectedFilter(filterFunc);
        } else {
          // Manejar la situación en la que filterFunc no es una función
          console.error("El filtro seleccionado no es una función válida.");
        }
      };

    return(
        
        <div className="fill-fire" id="FIRE">
        {
          modalContext?.optFilter.canvasI.length !== 0?modalContext?.optFilter.canvasI.map((opt:any,i:number)=>(
            <div id={opt.canvasId+i} className="mark-fire" key={i}
             onClick={()=>{
              modalContext.setIsSettings(false);
              selectFilter(opt.filtro);
              
            }}
            >
              <canvas
              ref={el => canvasRefs.current[i] = el}
               id={opt.canvasId}
               width={opt.widthC}
               height={opt.heightC}
               ></canvas>
              <span>{opt.nameFilter}</span>
            </div>
        )):null
          }
      </div>
     
    );
   
}
export default Previsualizaciones;