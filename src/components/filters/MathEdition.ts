import { ImageType } from "./ImageType";
class MathEdition{
    public static initArray3D(width: number, height: number): number[][][] {
        var arrImage = new Array(3).fill(null).map(() => 
          new Array(height).fill(null).map(() => 
            new Array(width).fill(0)
          )
        );
        return arrImage;
      }
      //TODOS LOS METODOS PARA ECUALIZAR FUERON OPTIMIZADOS
      public static ecualizar(img: ImageType): number[][][] {
        const arrImage = img.getArrayImg();
        const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());
        const hA = MathEdition.histAcum(MathEdition.hist(img));
    
        let fT = Array.from({ length: 3 }, () => new Array(256));
    
        for (let i = 0; i < 256; i++) {
            fT.forEach((channel, index) => {
                fT[index][i] = Math.floor(hA[index][i] * 255.0 / hA[index][255]);
            });
        }
    
        for (let i = 0; i < img.getHeight(); i++) {
            for (let j = 0; j < img.getWidth(); j++) {
                sal.forEach((channel, index) => {
                    sal[index][i][j] = fT[index][arrImage[index][i][j]];
                });
            }
        }
    
        return sal;
    }
    public static hist(img: ImageType): number[][] {
      const arrImage = img.getArrayImg();
      const sal = Array.from({ length: 3 }, () => new Array(256).fill(0));
  
      for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
              sal.forEach((channel, index) => {
                  channel[arrImage[index][i][j]]++;
              });
          }
      }
  
      return sal;
  }
  public static histAcum(h: number[][]): number[][] {
    const hist = Array.from({ length: 3 }, () => new Array(256).fill(0));

    h.forEach((channel, index) => {
        hist[index][0] = channel[0];
        for (let i = 1; i < channel.length; i++) {
            hist[index][i] = hist[index][i - 1] + channel[i];
        }
    });

    return hist;
}

      //ESTE METODO ESTA OPTIMIZADO Y MEJORADO
      public static colorGradienteXtwo(img: ImageType, factores: number[]): number[][][] {
        const arrImage: number[][][] = img.getArrayImg();
        const sal: number[][][] = MathEdition.initArray3D(img.getWidth(), img.getHeight());
    
        let [rStart, gStart, bStart, rEnd, gEnd, bEnd] = factores;
    
        const dr = (rEnd - rStart) / img.getWidth();
        const dg = (gEnd - gStart) / img.getWidth();
        const db = (bEnd - bStart) / img.getWidth();
    
        for (let x = 0; x < img.getWidth(); x++) {
            for (let y = 0; y < img.getHeight(); y++) {
                const prom = (arrImage[0][y][x] + arrImage[1][y][x] + arrImage[2][y][x]) / 3;
                const factor = 1 / 255;
                sal[0][y][x] = Math.floor(prom * rStart * factor);
                sal[1][y][x] = Math.floor(prom * gStart * factor);
                sal[2][y][x] = Math.floor(prom * bStart * factor);
            }
            rStart += dr;
            gStart += dg;
            bStart += db;
        }
    
        return sal;
    }
//MetodoOptimizado
    public static colorGradientY(img: ImageType, factores: number[]): number[][][] {
      const arrImage = img.getArrayImg();
      const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());
      const [rStart, gStart, bStart, rEnd, gEnd, bEnd] = factores;
  
      const dr = (rEnd - rStart) / img.getHeight();
      const dg = (gEnd - gStart) / img.getHeight();
      const db = (bEnd - bStart) / img.getHeight();
  
      let rCurrent = rStart;
      let gCurrent = gStart;
      let bCurrent = bStart;
  
      for (let y = 0; y < img.getHeight(); y++) {
          for (let x = 0; x < img.getWidth(); x++) {
              const prom = (arrImage[0][y][x] + arrImage[1][y][x] + arrImage[2][y][x]) / 3;
              const factor = 1 / 255;
              sal[0][y][x] = Math.floor(prom * rCurrent * factor);
              sal[1][y][x] = Math.floor(prom * gCurrent * factor);
              sal[2][y][x] = Math.floor(prom * bCurrent * factor);
          }
          rCurrent += dr;
          gCurrent += dg;
          bCurrent += db;
      }
  
      return sal;
  }
  //Contraste OPTIMIZADO
  public static changeContraste(img: ImageType, valor: number): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());
    const contraste = (valor + 100) / 100;

    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = MathEdition.adjustContrast(arrImage[0][i][j], contraste);
        sal[1][i][j] = MathEdition.adjustContrast(arrImage[1][i][j], contraste);
        sal[2][i][j] = MathEdition.adjustContrast(arrImage[2][i][j], contraste);
      }
    }
    return sal;
  }

  private static adjustContrast(value: number, contraste: number): number {
    let adjusted = ((((value / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
    return Math.min(255, Math.max(0, adjusted));
  }
  
  public static changeBrightness(img: ImageType, factor: number): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());

    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = MathEdition.clampValue(arrImage[0][i][j] * factor);
        sal[1][i][j] = MathEdition.clampValue(arrImage[1][i][j] * factor);
        sal[2][i][j] = MathEdition.clampValue(arrImage[2][i][j] * factor);
      }
    }
    return sal;
  }

  private static clampValue(value: number): number {
    return Math.min(255, Math.max(0, value));
  }
  public static applySimpleFalseColorFilter(img: ImageType, factors: number[]): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());

    // Factores para cada canal de color
    const redFactor = factors[0];
    const greenFactor = factors[1];
    const blueFactor = factors[2];

    for (let i = 0; i < img.getHeight(); i++) {
        for (let j = 0; j < img.getWidth(); j++) {
            sal[0][i][j] = MathEdition.clampValueFakeColor(arrImage[0][i][j] * redFactor);   // Rojo
            sal[1][i][j] = MathEdition.clampValueFakeColor(arrImage[1][i][j] * greenFactor); // Verde
            sal[2][i][j] = MathEdition.clampValueFakeColor(arrImage[2][i][j] * blueFactor);  // Azul
        }
    }

    return sal;
}

private static clampValueFakeColor(value: number): number {
    return Math.min(255, Math.max(0, value));
}
//NO IMPLEMENTADA NEW ISSUE-FATURES
public static applyAdvancedFalseColorFilter(img: ImageType, params: number[], colorMap?: { [key: number]: [number, number, number] }, nonlinearMapping?: (value: number) => number): number[][][] {
  const arrImage = img.getArrayImg();
  const sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());

  const [factorRojo, factorVerde, factorAzul, factorContraste] = params;

  for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
          // Obtener valor del píxel y aplicar mapeo no lineal si existe
          let pixelValue = MathEdition.getPixelValueQ(arrImage, i, j);
          if (nonlinearMapping) {
              pixelValue = nonlinearMapping(pixelValue);
          }

          // Aplicar paleta de colores si existe, de lo contrario, aplicar factores de color
          if (colorMap && colorMap[pixelValue]) {
              const [r, g, b] = colorMap[pixelValue];
              sal[0][i][j] = MathEdition.clampValueQ(r);
              sal[1][i][j] = MathEdition.clampValueQ(g);
              sal[2][i][j] = MathEdition.clampValueQ(b);
          } else {
              sal[0][i][j] = MathEdition.clampValueQ(MathEdition.adjustContrastQ(arrImage[0][i][j], factorContraste) * factorRojo);
              sal[1][i][j] = MathEdition.clampValueQ(MathEdition.adjustContrastQ(arrImage[1][i][j], factorContraste) * factorVerde);
              sal[2][i][j] = MathEdition.clampValueQ(MathEdition.adjustContrastQ(arrImage[2][i][j], factorContraste) * factorAzul);
          }
      }
  }

  return sal;
}

  private static clampValueQ(value: number): number {
    return Math.min(255, Math.max(0, value));
  }

  private static adjustContrastQ(value: number, factorContraste: number): number {
    // Lógica de ajuste de contraste
    return (((value / 255.0 - 0.5) * factorContraste) + 0.5) * 255.0;
  }

  private static getPixelValueQ(arrImage: number[][][], i: number, j: number): number {
    // Obtener un valor representativo del píxel (promedio, máximo, etc.)
    // Esta es una implementación de ejemplo que toma el promedio
    return (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
  }

  public static cambioFTransferencia(img: ImageType, factores: number[]): number[][][] {
    var arrImage: number[][][] = img.getArrayImg();
    factores.unshift(0, 0);
    let tamFact = factores.length;
    let I1: number, I2: number, O1: number, O2: number;
    let factor;
    var sal: number[][][] = MathEdition.initArray3D(img.getWidth(), img.getHeight());
 
    for (let k = 2; k < tamFact; k += 2) {
      I1 = factores[k - 2];
      O1 = factores[k - 1];
      I2 = factores[k];
      O2 = factores[k + 1];
      factor = (O2 - O1) / (I2 - I1);
      //console.log(factor)
      for (let i = 0; i < img.getHeight(); i++) {
        for (let j = 0; j < img.getWidth(); j++) {
          if (arrImage[0][i][j] >= I1 && arrImage[0][i][j] < I2)
            sal[0][i][j] = factor * (arrImage[0][i][j] - I1) + O1;
          
          
          if (arrImage[1][i][j] >= I1 && arrImage[1][i][j] < I2)
            sal[1][i][j] = factor * (arrImage[1][i][j] - I1) + O1;
         
          
          if (arrImage[2][i][j] >= I1 && arrImage[2][i][j] < I2)
            sal[2][i][j] = factor * (arrImage[2][i][j] - I1) + O1;
         
          
        }
      }

    }
    return sal;
  }
     

    
}
export default MathEdition;