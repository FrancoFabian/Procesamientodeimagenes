import React, { useRef, useState,useContext,useEffect } from 'react';
import { ModalContext } from '../context/ModalProvider';
import './SettingsImage.css';

const Genra: React.FC = () => (
    <div className='Hay'>
       <i className="bi bi-arrow-clockwise"></i>
    </div>
);

const SettingsImage: React.FC<{ onFileSelect?: (file: File) => void }> = ({ onFileSelect }) => {
    type GeneralFilterFunction = (...args: any[]) => number[][][];
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error("Component must be wrapped within a ModalProvider");
      }
    const settingRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [closeImg,setCloseImg] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    useEffect(() => {
      if (modalContext.optionsGen !== 3) {
        setExpandedIndex(null)
      }
    }, [modalContext.optionsGen])
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            modalContext?.setImgComposite(file);
            setCloseImg(true)
            if (onFileSelect) {
                onFileSelect(file);
                
            }
        }
    };

    const handleCloseClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Detiene la propagación del evento
        setPreviewUrl(null);
        if (settingRef.current) {
            setCloseImg(false);
            settingRef.current.value = ''; // Restablece el input del archivo
        }
    };
    const handleCloseClick2 = () => {
        // Detiene la propagación del evento
        setPreviewUrl(null);
        if (settingRef.current) {
            setCloseImg(false);
            settingRef.current.value = ''; // Restablece el input del archivo
        }
    };
    const handleCancel = () =>{
        
        
    }
    const handleExpand = (index: number) => {
        if (expandedIndex === index) {
            setExpandedIndex(null); // Si se hace clic en el mismo elemento, vuelve a mostrar todos
        } else {
            setExpandedIndex(index); // Expande el elemento seleccionado
        }
    };
    
    const handleBack = (event: React.MouseEvent) => {
        event.stopPropagation(); // Detiene la propagación del evento
        setExpandedIndex(null);
        handleCloseClick2()
    }
    
    const selectFilter = (filterFunc: GeneralFilterFunction | null | undefined) => {
        if (typeof filterFunc === 'function') {
          modalContext.setSelectedFilter(filterFunc);
        } else {
          // Manejar la situación en la que filterFunc no es una función
          console.error("El filtro seleccionado no es una función válida.");
        }
      }; 

    return (
        <>
        {modalContext.optFilter.SettingsImage.length !== 0 ?
        modalContext.optFilter.SettingsImage.map((setImg,index)=>(
        <div key={index} id='ImageSEQ2'
             onClick={() => handleExpand(index)}  
             className={`ImageSE ${expandedIndex === null? '': expandedIndex === index ? 'active' : 'inactive'}`}>
            <div  className="titleIm">{setImg.name}</div>
            <div id="contSetImQA" className={`contSetIm ${expandedIndex === index ? 'active' : ''}`}>
                <div className={`preLoad ${closeImg?'active':''}`} id='preLoad'>
                    {previewUrl ? (
                    <div className="closeImg" onClick={(event) => handleCloseClick(event)}>X</div>
                    ) : (
                    <Genra />
                    )}
                    {previewUrl && <img className='preImg' src={previewUrl} alt="Preview" />}
                </div>
                <input 
                    ref={settingRef} 
                    type="file" 
                    accept="image/*" 
                    id='SettingsIm' 
                    onChange={handleFileChange} 
                />
                <label id='cao2A' className={`coaa2 ${closeImg?'active':''}`} htmlFor="SettingsIm">
                    <i className="bi bi-pc-display-horizontal"></i> De este Dispositivo
                </label>
            </div>
            
            <div className={`Actions-CA2 ${closeImg?'active':''}`} id={`actionAp`}>
                <button onClick={handleCancel} className="Bca2 cancel">Cancelar</button>
                <button className="Bca2 apli">Aplicar</button>
            </div>
            <button onClick={(event) => handleBack(event)} className='reback'><i className="bi bi-arrow-left"></i> Atras</button>
        </div>)):null
        }
        </>
    );
}

export default SettingsImage;
