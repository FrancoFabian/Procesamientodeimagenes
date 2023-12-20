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
      public static ecualizar(img: ImageType): number[][][] {

        //variable que guarda el arreglo 3d de la imagen de color
        let arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        let sal = MathEdition.initArray3D(img.getWidth(), img.getHeight());
        let h = MathEdition.hist(img);
        let hA = MathEdition.histAcum(h);
        let fT: number[][];
        fT = new Array(3);
        fT[0] = new Array(256);
        fT[2] = new Array(256);
        fT[1] = new Array(256);
        
        for (let i = 0; i < 256; i++) {
          fT[0][i] = Math.floor(hA[0][i] * 255.0 / hA[0][255]);
          fT[1][i] = Math.floor(hA[1][i] * 255.0 / hA[1][255]);
          fT[2][i] = Math.floor(hA[2][i] * 255.0 / hA[2][254]);
        }
        
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][i][j] = fT[0][arrImage[0][i][j]];
            sal[1][i][j] = fT[1][arrImage[1][i][j]];
            sal[2][i][j] = fT[2][arrImage[2][i][j]];
          }
        }
      
        return sal;
      }
      public static hist(img: ImageType): number[][] {

        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = new Array(3);
        sal[0] = new Array(256);
        sal[1] = new Array(256);
        sal[2] = new Array(256);
        
        for (let i = 0; i < 256; i++) {
          sal[0][i] = 0;
          sal[1][i] = 0;
          sal[2][i] = 0;
        }
        
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][arrImage[0][i][j]]++;
            sal[1][arrImage[1][i][j]]++;
            sal[2][arrImage[2][i][j]]++;
          }
        }
        //console.log(sal[0])
        return sal;
      }
      public static histAcum(h: number[][]): number[][] {

        //variable donde guardamos la salida
        var hist = new Array(3);
        hist[0] = new Array(256);
        hist[1] = new Array(256);
        hist[2] = new Array(256);
      
        hist[0][0] = h[0][0];
        hist[1][0] = h[1][0];
        hist[2][0] = h[2][0];
        for (let i = 1; i < h[0].length; i++) {
          hist[0][i] = hist[0][i - 1] + h[0][i];
          hist[1][i] = hist[1][i - 1] + h[1][i];
          hist[2][i] = hist[2][i - 1] + h[2][i];
          //if(i==255)
        }
        return hist;
      }
    
    
}
export default MathEdition;