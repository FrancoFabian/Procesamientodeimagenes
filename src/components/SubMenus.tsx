import React,{useContext} from "react";
import { ModalContext } from "./context/ModalProvider";
import './styles/SubMenus.css'
import Previsualizaciones from "./microcomponents/Previsualizaciones";
import Settings from "./microcomponents/Settings";
import SettingsEdition from "./microcomponents/SettingsEdition";
import SettingsImage from "./microcomponents/SettingsImage";

const SubMenus: React.FC = () => {


  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  
  
  
 
    return(
        <div className="sub-menus" id="sub-menus" onClick={()=>{}}>
        {modalContext.optFilter.canvasI.length > 1 ? <div className="see-plus inactive" id="minus" onClick={()=>{
          document.getElementById("minus")?.classList.add("inactive");
          document.getElementById("sums")?.classList.remove("inactive");
          document.getElementById("FIRE")?.classList.remove("active");
         }}>
            <div className="bar"></div>
            <div className="select-plus">
            <span><i className="bi bi-dash-circle"></i> </span>
            <i className="bi bi-eye"></i>
            </div>
            
          </div>:null  }
        { modalContext.optFilter.canvasI.length > 0? <Previsualizaciones/>: null}
          
       {modalContext.optFilter.canvasI.length > 1 ? <div className="see-plus" id="sums" onClick={()=>{
              document.getElementById("minus")?.classList.remove("inactive");
              document.getElementById("sums")?.classList.add("inactive");
              document.getElementById("FIRE")?.classList.add("active");
        }}>
            <div className="bar"></div>
            <div className="select-plus">
            <i className="bi bi-eye"></i>
            <span> {modalContext.optFilter.canvasI.length - 1}<i className="bi bi-plus"></i></span>
            </div>
            
          </div> : null }
          
         <Settings/>
        <SettingsEdition/>
        <SettingsImage/>
          
      </div>
      
    );
}
export default SubMenus;