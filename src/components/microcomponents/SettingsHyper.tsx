import React,{useState} from "react";
import ColorPicker from 'react-best-gradient-color-picker'
import './SettingsHyper.css'
type ColorEntry = {
    intensity: number;
    color: string;
};

const SettingsHyper:React.FC = () =>{
    const [color, setColor] = useState<string>('rgba(255,255,255,1)');
   
    const [colorEntries, setColorEntries] = useState<ColorEntry[]>([]);
    

    const addColorEntry = () => {
        setColorEntries([...colorEntries, { intensity: 0, color: '#ffffff' }]);
    };

    const updateColorEntry = (index: number, entry: ColorEntry) => {
        const newEntries = [...colorEntries];
        newEntries[index] = entry;
        setColorEntries(newEntries);
    };

    const removeColorEntry = (index: number) => {
        const newEntries = [...colorEntries];
        newEntries.splice(index, 1);
        setColorEntries(newEntries);
    };

    const applyColorMap = () => {
        // Aquí procesas el colorMap como necesites
        console.log('Color Map:', colorEntries);
    };
    return (
        <div className="HypertContent" >
            
            
            {colorEntries.map((entry, index) => (
                <div key={index} >
                    <input
                        type="number"
                        min="0"
                        max="255"
                        value={entry.intensity}
                        onChange={(e) => updateColorEntry(index, { ...entry, intensity: parseInt(e.target.value) })}
                        
                    />
                    <input
                        type="color"
                        value={entry.color}
                        onChange={(e) => updateColorEntry(index, { ...entry, color: e.target.value })}
                        
                    />
                    <button onClick={() => removeColorEntry(index)}>Eliminar</button>
                </div>
            ))}
            <button onClick={addColorEntry} >Añadir Color</button>
            <button onClick={applyColorMap} >Aplicar ColorMap</button>
        </div>
    );
}
export default SettingsHyper;