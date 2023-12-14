import MathImg from "../filters/Math";
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
            }
        ],
        Settings:[
            {
                nameFilter:"Gamma",
                filtro:null,
                rangeSettings:[
                    {id:'gamma1',nombre:'Valor 1',range:100},
                    {id:'gamma2',nombre:'Valor 2',range:200},
                    {id:'gamma3',nombre:'Valor 3',range:300}
                ]
            },
            {
                nameFilter:"Umbral 1 valor",
                filtro:null,
                rangeSettings:[
                    {id:'umb1',nombre:'nombre1',range:100},
                    {id:'umb2',nombre:'nombre2',range:200},
                    {id:'umb3',nombre:'nombre3',range:300}
                ]
            },
            {
                nameFilter:"Umbral 2 limites",
                filtro:null,
                rangeSettings:[
                    {id:'ubl1',nombre:'Limite 1',range:100},
                    {id:'ubl2',nombre:'Limite 2',range:200},
                    
                ]
            },   {
                nameFilter:"Disface X",
                filtro:null,
                rangeSettings:[
                    {id:'dx1',nombre:'nombre1',range:100},
                    {id:'dx2',nombre:'nombre2',range:200},
                    {id:'dx3',nombre:'nombre3',range:300}
                ]
            },
            ,   {
                nameFilter:"Disface Y",
                filtro:null,
                rangeSettings:[
                    {id:'dy1',nombre:'nombre1',range:100},
                    {id:'dy2',nombre:'nombre2',range:200},
                    {id:'dy3',nombre:'nombre3',range:300}
                ]
            },
            ,   {
                nameFilter:"Disface Diagonal",
                filtro:null,
                rangeSettings:[
                    {id:'dd1',nombre:'nombre1',range:100},
                    {id:'dd2',nombre:'nombre2',range:200},
                    {id:'dd3',nombre:'nombre3',range:300}
                ]
            },
            ,   {
                nameFilter:"Negativo de Grises",
                filtro:null,
                rangeSettings:[
                    {id:'ng1',nombre:'nombre1',range:100},
                    {id:'ng2',nombre:'nombre2',range:200},
                    {id:'ng3',nombre:'nombre3',range:300}
                ]
            },
        ]
    }
]