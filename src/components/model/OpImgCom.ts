import MathImgC from "../filters/MathImgC";
import { OptionObject } from "./OptionsFilter";

export const OpImgCom:OptionObject =  {
    title:"Imagenes Compuestas",
    canvasI:[],
    Settings:[],
    SettingsTypeSpecial:[],
    SettingsHyper:[],
    SettingsImage:[
        {
            name:"SumImg iguales",
            filtro:MathImgC.addImg,
            rangeSettingns:[]
        },
        {
            name:"Suma Array",
            filtro:MathImgC.addImg,
            rangeSettingns:[]
        },
        {
            name:"Suma Rescalada",
            filtro:MathImgC.addImg,
            rangeSettingns:[]
        },
        {
            name:"Marca de Agua Array",
            filtro:MathImgC.addImg,
            rangeSettingns:[]
        },
        {
            name:"Marca de Agua Centro",
            filtro:MathImgC.addImg,
            rangeSettingns:[]
        }
    ]

}