import { ImageType } from "./ImageType";

 class MathImg {
    public static initArray3D(width: number, height: number): number[][][] {
        var arrImage = new Array(3).fill(null).map(() => 
          new Array(height).fill(null).map(() => 
            new Array(width).fill(0)
          )
        );
        return arrImage;
      }

 
  public static toGray(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight()); // Llamada correcta a initArray3D

    for (let i = 0; i < img.getHeight(); i++) {
        for (let j = 0; j < img.getWidth(); j++) {
            const promedio = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
            sal[0][i][j] = promedio;
            sal[1][i][j] = promedio;
            sal[2][i][j] = promedio;
        }
    }

    return sal;
}

  // ... (Otros métodos y initArray3D)

  public static toNegative(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 255 - arrImage[0][i][j];
        sal[1][i][j] = 255 - arrImage[1][i][j];
        sal[2][i][j] = 255 - arrImage[2][i][j];
      }
    }
    return sal;
  }

  // Los métodos toRed, toGreen, toBlue, toTricolor, etc. se actualizarán de manera similar.
  // Por ejemplo, para toRed:

  public static toRed(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = arrImage[0][i][j];
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    }
    return sal;
  }
  public static toGreen(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = 0;
      }
    }
    return sal;
  }
  
  public static toBlue(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = 0;
        sal[2][i][j] = arrImage[2][i][j];
      }
    }
    return sal;
  }
  
  public static toTricolor(img: ImageType): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    let inicio = 0;
    let termino = Math.floor(img.getWidth() / 3);
    
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = inicio; j < termino; j++) {
        sal[0][i][j] = 0;
        sal[1][i][j] = arrImage[1][i][j];
        sal[2][i][j] = 0;
      }
    }
  
    inicio = termino;
    termino *= 2;
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = inicio; j < termino; j++) {
        const prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = prom;
        sal[1][i][j] = prom;
        sal[2][i][j] = prom;
      }
    }
  
    inicio = termino;
    termino = img.getWidth();
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = inicio; j < termino; j++) {
        sal[0][i][j] = arrImage[0][i][j];
        sal[1][i][j] = 0;
        sal[2][i][j] = 0;
      }
    }
  
    return sal;
  }

  // Similarmente, para toGreen, toBlue, toTricolor, etc.

  // Otros métodos como correctionGamma, toUmbral, toDesfaceX, etc., también deberán ser actualizados.
  // Por ejemplo, para correctionGamma:

  public static correctionGamma(img: ImageType, factores: number[]): number[][][] {
    const arrImage = img.getArrayImg();
    const sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]);
        sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]);
        sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]);
      }
    }
    return sal;
  }


  public static funcionGamma(pixel: number, factor: number): number {
    return Math.min(255 * Math.pow(pixel / 250, factor), 255);
  }

  
}
export default MathImg;