import { ImageType } from "./ImageType";
class MathImgC {

    
    public static resizeImageBicubic(img: ImageType, newWidth: number, newHeight: number): number[][][] {
        const srcArr = img.getArrayImg();
        const resizedArr = MathImgC.initArray3D(newWidth, newHeight);

        const xRatio = img.getWidth() / newWidth;
        const yRatio = img.getHeight() / newHeight;

        for (let i = 0; i < newHeight; i++) {
            for (let j = 0; j < newWidth; j++) {
                for (let channel = 0; channel < 3; channel++) {
                    const pixel = MathImgC.getBicubicPixel(srcArr, channel, j * xRatio, i * yRatio);
                    resizedArr[channel][i][j] = Math.min(255, Math.max(0, Math.round(pixel)));
                }
            }
        }

        return resizedArr;
    }
    
    private static getBicubicPixel(srcArr: number[][][], channel: number, x: number, y: number): number {
        const xInt = Math.floor(x);
        const yInt = Math.floor(y);
        
        let sum = 0;
        let weights = 0;

        for (let m = -1; m <= 2; m++) {
            for (let n = -1; n <= 2; n++) {
                const xCur = xInt + m;
                const yCur = yInt + n;

                // Verificar los límites de la imagen
                if (xCur >= 0 && xCur < srcArr[0][0].length && yCur >= 0 && yCur < srcArr[0].length) {
                    const weight = MathImgC.bicubicKernel(x - xCur) * this.bicubicKernel(y - yCur);
                    sum += srcArr[channel][yCur][xCur] * weight;
                    weights += weight;
                }
            }
        }

        return sum / weights;
    }

    private static bicubicKernel(x: number): number {
        x = Math.abs(x);
        if (x <= 1) {
            return (1.5 * x - 2.5) * x * x + 1;
        } else if (x < 2) {
            return ((-0.5 * x + 2.5) * x - 4) * x + 2;
        }
        return 0;
    }

    public static resizeImage(img: ImageType, newWidth: number, newHeight: number): number[][][] {
        const srcArr = img.getArrayImg();
        const resizedArr = this.initArray3D(newWidth, newHeight);

        const xRatio = img.getWidth() / newWidth;
        const yRatio = img.getHeight() / newHeight;

        for (let i = 0; i < newHeight; i++) {
            for (let j = 0; j < newWidth; j++) {
                const x = Math.floor(j * xRatio);
                const y = Math.floor(i * yRatio);
                const xDiff = (j * xRatio) - x;
                const yDiff = (i * yRatio) - y;

                for (let channel = 0; channel < 3; channel++) {
                    // Asegurarse de que los índices no excedan los límites de la imagen
                    const x1 = Math.min(img.getWidth() - 1, x + 1);
                    const y1 = Math.min(img.getHeight() - 1, y + 1);

                    const a = srcArr[channel][y][x];
                    const b = srcArr[channel][y][x1];
                    const c = srcArr[channel][y1][x];
                    const d = srcArr[channel][y1][x1];

                    const pixel = a * (1 - xDiff) * (1 - yDiff) + b * xDiff * (1 - yDiff) + c * yDiff * (1 - xDiff) + d * xDiff * yDiff;
                    resizedArr[channel][i][j] = Math.min(255, Math.max(0, Math.round(pixel)));
                }
            }
        }

        return resizedArr;
    }

    public static initArray3D(width: number, height: number): number[][][] {
        var arrImage = new Array(3).fill(null).map(() => 
          new Array(height).fill(null).map(() => 
            new Array(width).fill(0)
          )
        );
        return arrImage;
      }
      public static toAdd(img: ImageType, sumar: number): number[][][] {
        // Obtiene el arreglo 3D de la imagen de color
        var arrImage = img.getArrayImg();
        // Inicializa la salida
        var sal = MathImgC.initArray3D(img.getWidth(), img.getHeight());
        for (let i = 0; i < img.getHeight(); i++) {
            for (let j = 0; j < img.getWidth(); j++) {
                // Asegura que los valores estén dentro del rango 0-255
                sal[0][i][j] = Math.min(255, Math.max(0, arrImage[0][i][j] + sumar));
                sal[1][i][j] = Math.min(255, Math.max(0, arrImage[1][i][j] + sumar));
                sal[2][i][j] = Math.min(255, Math.max(0, arrImage[2][i][j] + sumar));
            }
        }
        return sal;
    }
    public static addImg(img: ImageType, img2: ImageType): number[][][] {
        // Primero, redimensiona img2 para que coincida con las dimensiones de img
        var arrImage2Resized = MathImgC.resizeImageBicubic(img2, img.getWidth(), img.getHeight());

        var arrImage = img.getArrayImg();
        var arrImage2 = arrImage2Resized; // Usar la imagen redimensionada
        var sal = MathImgC.initArray3D(img.getWidth(), img.getHeight());

        for (let i = 0; i < img.getHeight(); i++) {
            for (let j = 0; j < img.getWidth(); j++) {
                // Suma los valores de píxeles y asegura que el resultado esté en el rango 0-255
                sal[0][i][j] = Math.min(255, arrImage[0][i][j] + arrImage2[0][i][j]);
                sal[1][i][j] = Math.min(255, arrImage[1][i][j] + arrImage2[1][i][j]);
                sal[2][i][j] = Math.min(255, arrImage[2][i][j] + arrImage2[2][i][j]);
            }
        }
        return sal;
    }
    
}
export default MathImgC;