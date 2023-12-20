import MathImg from "../filters/Math";
import MathEdition from "../filters/MathEdition";
export const optionsObject = [
    {
        title:"Opciones Basicas",
        canvasI:[
            {
                canvasId:"grisId",
                filtro:MathImg.toGray,
                widthC:200,
                heightC:200,
                nameFilter:"Grises"
            },
            {
                canvasId:"negativoId",
                filtro:MathImg.toNegative,
                widthC:200,
                heightC:200,
                nameFilter:"Negativo"
            },
            {
                canvasId:"cnvredId",
                filtro:MathImg.toRed,
                widthC:200,
                heightC:200,
                nameFilter:"Conversion a Rojo"
            },
           
            {
                canvasId:"cnvblueId",
                filtro:MathImg.toBlue,
                widthC:200,
                heightC:200,
                nameFilter:"Conversion Azul"
            },
            {
                canvasId:"effectId",
                filtro:MathImg.toTricolor,
                widthC:200,
                heightC:200,
                nameFilter:"Efecto Tricolor"
            },
            {
                canvasId:"negToGrisesId",
                filtro:MathImg.toNegativeGrises,
                widthC:200,
                heightC:200,
                nameFilter:"Negativo de grises"
            },
        ],
        Settings:[
            {
                nameFilter:"Gamma",
                filtro:MathImg.correctionGammatwo,
                rangeSettings:[
                    {id:'gamma1',nombre:'Valor 1',range:7,defaultVal:0,min:0,step:"0.1"},
                    {id:'gamma2',nombre:'Valor 2',range:7,defaultVal:0,min:0,step:"0.1"},
                    {id:'gamma3',nombre:'Valor 3',range:7,defaultVal:0,min:0,step:"0.1"}
                ]
            },
            {
                nameFilter:"Umbral 1 valor",
                filtro:MathImg.toUmbral,
                rangeSettings:[
                    {id:'umb1',nombre:'nombre1',range:255,defaultVal:255,min:0,step:"0.1"}
                ]
            },
            {
                nameFilter:"Umbral 2 limites",
                filtro:MathImg.toUmbral2limitestwo,
                rangeSettings:[
                    {id:'ubl1',nombre:'Limite 1',range:250,defaultVal:0,min:0,step:"0.1"},
                    {id:'ubl2',nombre:'Limite 2',range:250,defaultVal:0,min:0,step:"0.1"},
                    
                ]
            },   {
                nameFilter:"Disface X",
                filtro:MathImg.toDesfaceX,
                rangeSettings:[
                    {id:'dx1',nombre:'nombre1',range:1000,defaultVal:0,min:0,step:"0.1"}
                ]
            },
            ,   {
                nameFilter:"Disface Y",
                filtro:MathImg.toDesfaceY2,
                rangeSettings:[
                    {id:'dy1',nombre:'nombre1',range:500,defaultVal:1,min:1,step:"1"}
                ]
            },
            ,   {
                nameFilter:"Disface Diagonal",
                filtro:MathImg.toDesfaceDnew2,
                rangeSettings:[
                    {id:'dd1',nombre:'Des',range:4000,defaultVal:0,min:0,step:"0.1"},
                    {id:'dd2ang',nombre:'Angulo',range:360,defaultVal:0,min:0,step:"0.1"}
                ]
            },
            
        ],
        SettingsTypeSpecial:[]
    },
    {
        canvasI:[
            {
                canvasId:"ecualizarId",
                filtro:MathEdition.ecualizar,
                widthC:200,
                heightC:200,
                nameFilter:"Ecualizar"
            }],
         Settings:[],
         SettingsTypeSpecial:[
            {
                nameFilter:"Disface Diagonal",
                filtro:MathImg.toDesfaceDnew2,
                rangeSettings:[
                    {id:'dd1',nombre:'Des',range:4000,defaultVal:0,min:0,step:"0.1"},
                    {id:'dd2ang',nombre:'Angulo',range:360,defaultVal:0,min:0,step:"0.1"}
                ]
            }
         ]

    }
]