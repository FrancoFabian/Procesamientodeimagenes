import React,{useRef,useContext} from "react";
import './styles/MenuTop.css';
import Svglarge from "./img/Svglarge";
import { ModalContext } from "./context/ModalProvider";
const MenuTop: React.FC = () => {
    const miRef = useRef<HTMLDivElement>(null);
    const inputPrincipal = useRef<HTMLInputElement>(null);
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
      throw new Error("Component must be wrapped within a ModalProvider");
    }
    const { isOpen, setIsOpen,setImage } = modalContext;
    function handleImageChange() {
      const fileInput = inputPrincipal.current;
       /* const file = event.target.files ? event.target.files[0] : null;
        if (file) {
          setImage(file); // Guardar el objeto File directamente
          setIsOpen(false);
        }*/
        if (fileInput && fileInput.files ) {
          const selectedFile = fileInput.files[0];
          setImage(selectedFile);
          setIsOpen(false);
          
        }
      
     
    }
    
  
    return(
        <div className="menu-top" id="menu-top">
             <div className="logo">
             <Svglarge/>
      </div>
      <div className="p-logo">
        <p>Procesamiento de Imagenes</p>
      </div>
      <div className="flex">
        <div className="open-file"
         id="open-file"
         onClick={()=>{
          setIsOpen(true)
          console.log(miRef)
         }
          
            
          }
         >
          <p>Abrir</p>
          <i className="bi bi-caret-down-fill"></i>
          <div ref={miRef} className={`Open-fixed${isOpen ? "modal" : " "}`} id="Open-fixed" >
            <div className="Open-arch">
              <h6>Nueva imagen</h6>
              <input type="file" name="file" id="file" accept="image/*" 
                onChange={()=>{
                 handleImageChange()
                 
                
                   
                }}
                ref={inputPrincipal}
              />
              <label className="coaa" htmlFor="file">
                <i className="bi bi-pc-display-horizontal"></i> De este Dispositivo
              </label>
            </div>
          </div>
        </div>
        <div className="save-file" id="save-file">
          <p>Guardar</p>
          <i className="bi bi-box-arrow-down"></i>
        </div>
      </div>

        </div>
    );
}
export default MenuTop;