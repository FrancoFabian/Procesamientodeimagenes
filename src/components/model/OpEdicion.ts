import MathEdition from "../filters/MathEdition";
import { OptionObject } from "./OptionsFilter";

export const OpEdition:OptionObject = {
    title:"Edicion",
    canvasI:[
        {
            canvasId:"ecualizarId",
            filtro:MathEdition.ecualizar,
            widthC:200,
            heightC:200,
            nameFilter:"Ecualizar"
        }
    ],
     Settings:[],
     SettingsTypeSpecial:[
        {
            nameFilter:"Gradiente X",
            filtro:MathEdition.colorGradienteXtwo,
            rangeSettings:[
                {wTitle:'Inicio',id:'gradX1',nombre:'R',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradX2',nombre:'G',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradX3',nombre:'B',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'Fin',id:'gradX4',nombre:'R',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradX5',nombre:'G',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradX6',nombre:'B',range:255,defaultVal:0,min:0,step:"0.1"}
            ]
        },
        {
            nameFilter:"Gradiente Y",
            filtro:MathEdition.colorGradientY,
            rangeSettings:[
                {wTitle:'Inicio',id:'gradY1',nombre:'R',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradY2',nombre:'G',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradY3',nombre:'B',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'Fin',id:'gradY4',nombre:'R',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradY5',nombre:'G',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'gradY6',nombre:'B',range:255,defaultVal:0,min:0,step:"0.1"}
            ]
        },
        {
            nameFilter:"Contraste",
            filtro:MathEdition.changeContraste,
            rangeSettings:[
                {wTitle:'',id:'contraste',nombre:'Valor',range:255,defaultVal:0,min:0,step:"0.1"}
            ]
        },
        {
            nameFilter:"Brillo",
            filtro:MathEdition.changeBrightness,
            rangeSettings:[
                {wTitle:'',id:'shine',nombre:'Valor',range:255,defaultVal:0,min:0,step:"0.1"}
            ]
        },
        {
            nameFilter:"Falso Color",
            filtro:MathEdition.applySimpleFalseColorFilter,
            rangeSettings:[
                {wTitle:'',id:'fake1',nombre:'R',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'fake2',nombre:'G',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'fake3',nombre:'B',range:255,defaultVal:0,min:0,step:"0.1"}
            ]
        },
        {
            nameFilter:"Funcion Transferencia",
            filtro:MathEdition.cambioFTransferencia,
            rangeSettings:[
                {wTitle:'',id:'cft1',nombre:'Valor 1',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'cft2',nombre:'Valor 2',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'cft3',nombre:'Valor 3',range:255,defaultVal:0,min:0,step:"0.1"},
                {wTitle:'',id:'cft4',nombre:'Valor 4',range:255,defaultVal:0,min:0,step:"0.1"},
            ]
        }

     ],
     SettingsHyper:[],
     SettingsImage:[]

}