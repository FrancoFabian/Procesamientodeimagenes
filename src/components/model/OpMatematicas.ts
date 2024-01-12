import MathOper from "../filters/MathOper";
import { OptionObject } from "./OptionsFilter";
export const OpMatematicas:OptionObject= {
    title:"Opciones Matematicas",
    canvasI:[
        {
            canvasId:"raizWId",
            filtro:MathOper.toSqrt,
            widthC:200,
            heightC:200,
            nameFilter:"Raíz"
        },
        {
            canvasId:"cosWId",
            filtro:MathOper.toCos,
            widthC:200,
            heightC:200,
            nameFilter:"Coseno"
        },
        {
            canvasId:"sinWId",
            filtro:MathOper.toSine,
            widthC:200,
            heightC:200,
            nameFilter:"Seno"
        },
        {
            canvasId:"tanWId",
            filtro:MathOper.toTan,
            widthC:200,
            heightC:200,
            nameFilter:"Tan"
        }
    ],
    Settings:[
        {
            nameFilter:"Potencia",
            filtro:MathOper.pow,
            rangeSettings:[
                {id:'powF1',nombre:'^x ',range:255,defaultVal:0,min:0,step:"1"}
               
            ]
        },
        {
            nameFilter:"Sumar",
            filtro:MathOper.toAdd,
            rangeSettings:[
                {id:'sumF1',nombre:'+ ',range:255,defaultVal:0,min:0,step:"1"}
               
            ]
        },
        {
            nameFilter:"Restar",
            filtro:MathOper.toSubtract,
            rangeSettings:[
                {id:'restF1',nombre:'- ',range:255,defaultVal:0,min:0,step:"1"}
               
            ]
        },
        {
            nameFilter:"Multiplicacion",
            filtro:MathOper.toMultiplication,
            rangeSettings:[
                {id:'multF1',nombre:'* ',range:255,defaultVal:0,min:0,step:"1"}
               
            ]
        }
    ],
    SettingsTypeSpecial:[],
    SettingsHyper:[],
    SettingsImage:[]
}