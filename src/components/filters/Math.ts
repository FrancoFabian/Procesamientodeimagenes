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
  public static correctionGammatwo(img: ImageType, gammas: number[]): number[][][] {
    if (gammas.length !== 3) {
        throw new Error("Se requieren exactamente 3 valores gamma para los canales R, G, B.");
    }

    const arrImage = img.getArrayImg();
    const width = img.getWidth();
    const height = img.getHeight();
    const output = MathImg.initArray3D(width, height);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            for (let k = 0; k < 3; k++) {
                // Asegúrate de que los valores de píxel estén en el rango [0, 255]
                const pixelValue = Math.min(Math.max(arrImage[k][i][j], 0), 255);
                // Aplica la corrección gamma
                output[k][i][j] = 255 * Math.pow(pixelValue / 255, gammas[k]);
            }
        }
    }

    return output;
}

  public static toUmbral(img: ImageType, umbral: number): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    var prom;
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        sal[0][i][j] = prom > umbral ? 255 : 0;
        sal[1][i][j] = sal[0][i][j];
        sal[2][i][j] = sal[0][i][j];
        
      }
    }
    return sal;
  }
  public static toUmbral2limitestwo(img: ImageType, rangos: number[]): number[][][] {
    var arrImage: number[][][] = img.getArrayImg();
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    let rangoMin = rangos[0];
    let rangoMax = rangos[1];
    const VALOR_BLANCO = 250;
    const VALOR_NEGRO = 0;
    
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < cols; j++) {
            let prome = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
            let valor = (prome >= rangoMin && prome <= rangoMax) ? VALOR_BLANCO : VALOR_NEGRO;
            sal[0][i][j] = valor;
            sal[1][i][j] = valor;
            sal[2][i][j] = valor;
        }
    }
    return sal;
}


  public static toUmbral2limites(img: ImageType, rangos: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    let rangoMin = rangos[0];
    let rangoMax = rangos[1];
    var prome;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        prome = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
        if (prome <= rangoMin && prome >= rangoMax) {
          sal[0][i][j] = 250;
        }
        else
          sal[0][i][j] = 0;
        sal[1][i][j] = sal[0][i][j];
        sal[2][i][j] = sal[0][i][j];
      }
    }
    return sal;
  }
  
  public static toDesfaceX(img: ImageType, des: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        sal[1][i][j] = arrImage[1][i][j];
        if ((j - des[0]) >= 0) {
          sal[0][i][j] = arrImage[0][i][j - des[0]];
        }
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        if ((j + des[0]) < cols) {
          sal[2][i][j] = arrImage[2][i][j + des[0]];
        }
        else {
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
    return sal;
  }

  public static toDesfaceY(img: ImageType, desy: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        sal[1][i][j] = arrImage[1][i][j];
        if ((i - desy[0]) >= 0) {
          sal[0][i][j] = arrImage[0][i - desy[0]][j];
        }
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        if ((i + desy[0]) < fila) {
          sal[2][i][j] = arrImage[2][i + desy[0]][j];
        }
        else {
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
    return sal;
  }
  public static toDesfaceY2(img: ImageType, desy: number[]): number[][][] {
    var arrImage: number[][][] = img.getArrayImg();
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
   
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < cols; j++) {
            // Blue channel remains unchanged
            sal[1][i][j] = arrImage[1][i][j];

            // Move red channel upwards
            let new_i_red = i - desy[0];
            if (new_i_red >= 0 && new_i_red < fila) {
                sal[0][i][j] = arrImage[0][new_i_red][j];
            } else {
                sal[0][i][j] = 0; // Assigning 0 for out-of-bounds pixels
            }

            // Move green channel downwards
            let new_i_green = i + desy[0];
            if (new_i_green >= 0 && new_i_green < fila) {
                sal[2][i][j] = arrImage[2][new_i_green][j];
            } else {
                sal[2][i][j] = 0; // Assigning 0 for out-of-bounds pixels
            }
        }
    }
    return sal;
}

  public static toDesfaceD(img: ImageType, des: number[]): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage: number[][][] = img.getArrayImg();
    //variable donde guardamos la salida
    var sal: number[][][] = MathImg.initArray3D(img.getWidth(), img.getHeight());
    var fila = arrImage[0].length, cols = arrImage[0][0].length;
    let desx = Math.floor(des[0] * Math.cos(des[1] * Math.PI / 180));
    let desy = Math.floor(des[0] * Math.sin(des[1] * Math.PI / 180));
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        sal[1][i][j] = arrImage[1][i][j];
        if ((i - desy) >= 0 && (j - desx) >= 0) {
          sal[0][i][j] = arrImage[0][i - desy][j - desx];
        }
        else {
          sal[0][i][j] = arrImage[0][i][j];
        }
        if ((i + desy) < fila && (j + desx) < cols) {
          sal[2][i][j] = arrImage[2][i + desy][j + desx];
        }
        else {
          sal[2][i][j] = arrImage[2][i][j];
        }
      }
    }
    return sal;
  }

  public static toDesfaceDnew2(img: ImageType, des: number[]): number[][][] {
    // Ensure the angle is within 0-360 degrees
    des[1] = des[1] % 360;

    // Calculate displacement in x and y directions
    let desx = Math.floor(des[0] * Math.cos(des[1] * Math.PI / 180));
    let desy = Math.floor(des[0] * Math.sin(des[1] * Math.PI / 180));

    // Get the 3D array of the image
    let arrImage: number[][][] = img.getArrayImg();
    let fila = img.getHeight();
    let cols = img.getWidth();

    // Initialize the output array using initArray3D
    let sal = MathImg.initArray3D(cols, fila);

    // Apply displacement with boundary handling
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < cols; j++) {
            // Handle blue channel (remains unchanged)
            sal[1][i][j] = arrImage[1][i][j];

            // Displace red channel
            let new_i_red = i - desy;
            let new_j_red = j - desx;
            if (new_i_red >= 0 && new_i_red < fila && new_j_red >= 0 && new_j_red < cols) {
                sal[0][i][j] = arrImage[0][new_i_red][new_j_red];
            } else {
                sal[0][i][j] = 0; // Using 0 for out-of-bounds pixels
            }

            // Displace green channel
            let new_i_green = i + desy;
            let new_j_green = j + desx;
            if (new_i_green < fila && new_i_green >= 0 && new_j_green < cols && new_j_green >= 0) {
                sal[2][i][j] = arrImage[2][new_i_green][new_j_green];
            } else {
                sal[2][i][j] = 0; // Using 0 for out-of-bounds pixels
            }
        }
    }

    return sal;
}

  

  public static toDesfaceDnew(img:ImageType,des: number[]): number[][][]{
    // Ensure the angle is within 0-360 degrees
    des[1] = des[1] % 360;

    // Calculate displacement in x and y directions
    let desx = Math.floor(des[0] * Math.cos(des[1] * Math.PI / 180));
    let desy = Math.floor(des[0] * Math.sin(des[1] * Math.PI / 180));

    // Get the 3D array of the image
    let arrImage: number[][][] = img.getArrayImg();
    let fila = img.getHeight();
    let cols = img.getWidth();

    // Initialize the output array using initArray3D
    let sal = MathImg.initArray3D(cols, fila);

    // Apply displacement
    for (let i = 0; i < fila; i++) {
      for (let j = 0; j < cols; j++) {
        // Handle blue channel (remains unchanged)
        sal[1][i][j] = arrImage[1][i][j];

        // Displace red channel
        let new_i = i - desy;
        let new_j = j - desx;
        if (new_i >= 0 && new_i < fila && new_j >= 0 && new_j < cols) {
          sal[0][i][j] = arrImage[0][new_i][new_j];
        }

        // Displace green channel
        new_i = i + desy;
        new_j = j + desx;
        if (new_i < fila && new_i >= 0 && new_j < cols && new_j >= 0) {
          sal[2][i][j] = arrImage[2][new_i][new_j];
        }
      }
    }

    // Update the image with the displaced data
    return sal;
  }
  public static toNegativeGrises(img: ImageType): number[][][] {
    //variable que guarda el arreglo 3d de la imagen de color
    var arrImage = img.getArrayImg();
    //variable donde guardamos la salida
    let prom;
    var sal = MathImg.initArray3D(img.getWidth(), img.getHeight());
    for (let i = 0; i < img.getHeight(); i++) {
      for (let j = 0; j < img.getWidth(); j++) {
        prom = (0.299 * arrImage[0][i][j] + 0.587 * arrImage[1][i][j] + 0.114 * arrImage[2][i][j]);
        sal[0][i][j] = 255 - prom;
        sal[1][i][j] = 255 - prom;
        sal[2][i][j] = 255 - prom;
      }
    }
    return sal;
  }

  
}
export default MathImg;