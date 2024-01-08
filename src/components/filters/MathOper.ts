import { ImageType } from "./ImageType";
class MathOper{
    public static initArray3D(width: number, height: number): number[][][] {
        var arrImage = new Array(3).fill(null).map(() => 
          new Array(height).fill(null).map(() => 
            new Array(width).fill(0)
          )
        );
        return arrImage;
      }
    
    
      public static toSqrt(img: ImageType): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Obtener el valor máximo en la imagen original para normalización
        let max = 0;
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    max = Math.max(max, arrImage[i][y][x]);
                }
            }
        }
    
        // Aplicar el filtro de raíz cuadrada y normalizar
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    sal[i][y][x] = Math.sqrt(arrImage[i][y][x] / max) * 255;
                }
            }
        }
    
        return sal;
    }
    
    public static toCos(img: ImageType): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Obtener el valor máximo en la imagen original para normalización
        let max = 0;
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    max = Math.max(max, arrImage[i][y][x]);
                }
            }
        }
    
        // Aplicar el filtro de coseno y normalizar
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    sal[i][y][x] = (Math.cos(arrImage[i][y][x] / max) + 1) * 0.5 * 255;
                }
            }
        }
    
        return sal;
    }
    public static toSine(img: ImageType): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Obtener el valor máximo en la imagen original para normalización
        let max = 0;
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    max = Math.max(max, arrImage[i][y][x]);
                }
            }
        }
    
        // Aplicar el filtro de seno y normalizar
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    sal[i][y][x] = (Math.sin(arrImage[i][y][x] / max) + 1) * 0.5 * 255;
                }
            }
        }
    
        return sal;
    }
    public static toTan(img: ImageType): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Obtener el valor máximo en la imagen original para normalización
        let max = 0;
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    max = Math.max(max, Math.abs(arrImage[i][y][x])); // Usar valor absoluto para evitar problemas con valores negativos
                }
            }
        }
    
        // Aplicar el filtro de tangente y normalizar
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // Agregar un pequeño valor al denominador para evitar divisiones por cero
                    const tanValue = Math.tan(arrImage[i][y][x] / max + 0.001);
                    sal[i][y][x] = (tanValue + 1) * 0.5 * 255;
                }
            }
        }
    
        return sal;
    }
    
    public static pow(img: ImageType, power: number[]): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Ajuste de gamma
        const adjustGamma = (value: number, gamma: number): number => Math.pow(value / 255, gamma) * 255;
    
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // Elevar cada componente de color a la potencia especificada
                    sal[i][y][x] = adjustGamma(arrImage[i][y][x], power[0]);
                }
            }
        }
    
        return sal;
    }

    public static toAdd(img: ImageType, sumar: number[]): number[][][] {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = MathOper.initArray3D(img.getWidth(), img.getHeight());
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][i][j] = arrImage[0][i][j] + sumar[0];
            sal[1][i][j] = arrImage[1][i][j] + sumar[0];
            sal[2][i][j] = arrImage[2][i][j] + sumar[0];
          }
        }
        return sal;
      }
         
    
      public static toSubtract(img: ImageType, escalar: number[]): number[][][] {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = MathOper.initArray3D(img.getWidth(), img.getHeight());
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][i][j] = arrImage[0][i][j] - escalar[0];
            sal[1][i][j] = arrImage[1][i][j] - escalar[0];
            sal[2][i][j] = arrImage[2][i][j] - escalar[0];
          }
        }
        return sal;
      }
    
      public static toMultiplication(img: ImageType, valor: number[]): number[][][] {
        const arrImage = img.getArrayImg();
        const height = img.getHeight();
        const width = img.getWidth();
        const sal = MathOper.initArray3D(width, height);
    
        // Asegurar que el valor de multiplicación esté dentro del rango permitido
        const multiplier = Math.max(0, Math.min(255, valor[0]));
    
        for (let i = 0; i < 3; i++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // Multiplicar cada componente de color por el valor especificado y normalizar
                    sal[i][y][x] = Math.min(255, arrImage[i][y][x] * multiplier);
                }
            }
        }
    
        return sal;
    }
    
      
      
}
export default MathOper;