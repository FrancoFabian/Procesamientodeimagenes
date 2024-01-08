import MathImg from "../filters/Math";
import MathEdition from "../filters/MathEdition";
import MathOper from "../filters/MathOper";
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
        SettingsTypeSpecial:[],
        SettingsHyper:[],
        SettingsImage:[]
    },
    {
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

    },
    {
        title:"Opciones Basicas",
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
        SettingsImage:[
            {}
        ]

    }
]