import React,{useState,useEffect,useContext} from "react";
import { ModalContext } from "./context/ModalProvider";
import './styles/SubMenus.css'
import { optionsObject } from "./model/OptionsFilter";
import Previsualizaciones from "./microcomponents/Previsualizaciones";
import Settings from "./microcomponents/Settings";
import SettingsEdition from "./microcomponents/SettingsEdition";
import SettingsHyper from "./microcomponents/SettingsHyper";
import SettingsImage from "./microcomponents/SettingsImage";
//import { ImageType } from "./filters/ImageType";
//import TamRenderCanvas from "./model/TamRenderCanvas";
const SubMenus: React.FC = () => {


  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Component must be wrapped within a ModalProvider");
  }
  //const [rangeValues, setRangeValues] = useState<Record<string, number>>({});
 // const [rangeValuestwo, setRangeValuesTwo] = useState<Record<string, number>>({});
  const [optionFilter] = useState(optionsObject[modalContext.optionsGen]);
  const [tamLenght] = useState(optionFilter.canvasI.length - 1);
 
    return(
        <div className="sub-menus" id="sub-menus" onClick={()=>{}}>
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
          <Previsualizaciones/>
          
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
          
         <Settings/>
        <SettingsEdition/>
        <SettingsImage/>
          
      </div>
      
    );
}
export default SubMenus;