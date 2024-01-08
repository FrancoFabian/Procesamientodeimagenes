import { useRef } from 'react';
import './SettingsImage.css'
const SettingsImage:React.FC = () =>{
    const settingRef = useRef<HTMLInputElement>(null);

    return(
        <div  className="ImageSE">
            <input ref={settingRef} type="file" accept="image/*" id='SettingsIm'/>
            <label className="coaa2" htmlFor="file">
                <i className="bi bi-pc-display-horizontal"></i> De este Dispositivo
            </label>
        </div>
    );
}
export default SettingsImage;