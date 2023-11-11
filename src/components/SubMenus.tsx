import React,{useState,useEffect,useContext} from "react";
import { ModalContext } from "./context/ModalProvider";
import './styles/SubMenus.css'
const SubMenus: React.FC = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  const {isOpen,setIsOpen} = modalContext;
  const [values, setValues] = useState<Record<number, number>>({});
  const rangeSettings: {nombre:String; range:number}[]= [
    {nombre:"Valor 1",range:100},
    {nombre:"Valor 2",range:150},
    {nombre:"Valor 3",range:100}
  ];


  const handleChange = (index: number, value: number) => {
    setValues(prevValues => ({
      ...prevValues,
      [index]: value
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
          <div className="mark-fire">
          <canvas></canvas>
          <span>Grises</span>
          </div>
          <div className="mark-fire">
          <canvas></canvas>
          <span>Negativo</span>
          </div>
          <div className="mark-fire">
          <canvas></canvas>
          <span>Conversion a Verde</span>
          </div>
          
        </div>  
        <div className="see-plus" id="sums" onClick={()=>{
              document.getElementById("minus")?.classList.remove("inactive");
              document.getElementById("sums")?.classList.add("inactive");
              document.getElementById("FIRE")?.classList.add("active");
        }}>
            <div className="bar"></div>
            <div className="select-plus">
            <i className="bi bi-eye"></i>
            <span> 3<i className="bi bi-plus"></i></span>
            </div>
            
          </div>  
          <div className="fire-settings" id="fire-settings" onClick={()=>{
            document.getElementById("fire-settings")?.classList.add("active")
            document.getElementById("sums")?.classList.add("inactive");
              document.getElementById("FIRE")?.classList.add("R");
              document.getElementById("minus")?.classList.add("inactive");
              document.getElementById("Action")?.classList.add("active")
            
          }}>
            <span>Gamma  <i className="bi bi-sliders"></i></span>
            <div className="Action" id="Action">
            {
        rangeSettings.map((rang,i)=>{
          const width = (200 / rang.range) * (values[i] || 0);
          return(
          <>
          <p key={i}>{rang.nombre}</p>
            <input className="ValorGamma" id="ValorGamma3"
             type="number" 
             value={values[i] || 0}
             onChange={e => handleChange(i, Number(e.target.value))}
             />

            <div className="main2">
                <input type="range" min="0" max={`${rang.range}`} id="Rang3"
                 value={values[i] || 0}
                  className="range2" 
                  onChange={e => handleChange(i, Number(e.target.value))}
                  />
                <div className="selector2" 
                   id={`selector${i}`}
                   style={{ width: `${width}px` }}  // Establece el ancho aquí
                
                ></div>
                <div className="fondo2" id="fondo223"></div>
            </div>
            </>
)})}

          

            <div className="Actions-CA">
                <div className="Bca cancel" id="cancel"
                onClick={(e)=>{
                  e.stopPropagation();
                 document.getElementById("fire-settings")?.classList.remove("active");
                 document.getElementById("FIRE")?.classList.remove("active");
                 document.getElementById("FIRE")?.classList.remove("R");
                 document.getElementById("minus")?.classList.add("inactive");
                 document.getElementById("Action")?.classList.remove("active")
                 document.getElementById("sums")?.classList.remove("inactive");

                }}
                ><p>Cancelar</p></div>
                <div className="Bca apli" id="Apli"><p>Aplicar</p></div>
            </div>
        </div>

          </div>
      </div>
      
    );
}
export default SubMenus;