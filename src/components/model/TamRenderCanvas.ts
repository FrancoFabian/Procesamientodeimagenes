 interface Medidas {
    N_imgWidth:number;
    N_imgHeight:number;
    N_canvasWidth:number;
    N_canvasHeight:number;

 }
 class TamRenderCanvas{
    private imgWidth!:number;
    private imgHeight!:number;
    private  canvasWidth!:number;
    private canvasHeight!:number;
    constructor(imgWidth:number,imgHeight:number,canvasWidth:number,canvasHeight:number){
             this.imgWidth = imgWidth;
             this.imgHeight = imgHeight;
             this.canvasWidth = canvasWidth;
             this.canvasHeight = canvasHeight;
    }
    public heightMasqWidth():Medidas{
        var ultimateCanvas_W:number;
        var ultimateCanvas_H:number;
        var ultimateImage_W:number;
        var ultimateImage_H:number;
        
        if(this.imgWidth < this.canvasWidth && this.imgHeight < this.canvasHeight){
           ultimateCanvas_W = this.imgWidth;
           ultimateCanvas_H = this.imgHeight;
           ultimateImage_W = this.imgWidth;
           ultimateImage_H = this.imgHeight;
           const heightXwidth:Medidas = {
            N_canvasWidth:ultimateCanvas_W,
            N_canvasHeight:ultimateCanvas_H,
            N_imgWidth:ultimateImage_W,
            N_imgHeight:ultimateImage_H
        }
        return heightXwidth;
        }else{
            ultimateCanvas_W =(((this.imgWidth * 100)/this.imgHeight)* this.canvasHeight)/100;
            ultimateCanvas_H = this.canvasHeight;
            ultimateImage_W = ultimateCanvas_W;
            ultimateImage_H = ultimateCanvas_H;
            const heightXwidth:Medidas = {
             N_canvasWidth:ultimateCanvas_W,
             N_canvasHeight:ultimateCanvas_H,
             N_imgWidth:ultimateImage_W,
             N_imgHeight:ultimateImage_H
         }
         return heightXwidth;
        }
       
        
    }
    public widthXheight():Medidas{
        var ultimateCanvas_W:number;
        var ultimateCanvas_H:number;
        var ultimateImage_W:number;
        var ultimateImage_H:number;
        if(this.imgWidth < this.canvasWidth && this.imgHeight < this.canvasHeight){
            ultimateCanvas_W = this.imgWidth;
            ultimateCanvas_H = this.imgHeight;
            ultimateImage_W = this.imgWidth;
            ultimateImage_H = this.imgHeight;
            const heightXwidth:Medidas = {
             N_canvasWidth:ultimateCanvas_W,
             N_canvasHeight:ultimateCanvas_H,
             N_imgWidth:ultimateImage_W,
             N_imgHeight:ultimateImage_H
         }
         return heightXwidth;
         }else{
            //ultimateCanvas_W =(((this.imgWidth * 100)/this.imgHeight)* this.canvasHeight)/100;
            ultimateCanvas_W = this.canvasWidth;
            ultimateCanvas_H = (((this.imgHeight * 100)/this.imgWidth) * this.canvasWidth)/100;
            ultimateImage_W = ultimateCanvas_W;
            ultimateImage_H = ultimateCanvas_H;
            const heightXwidth:Medidas = {
                N_canvasWidth:ultimateCanvas_W,
                N_canvasHeight:ultimateCanvas_H,
                N_imgWidth:ultimateImage_W,
                N_imgHeight:ultimateImage_H
            }
            return heightXwidth;
         }
       
    }
    public widthIgualheight():Medidas{
        var ultimateCanvas_W:number;
        var ultimateCanvas_H:number;
        var ultimateImage_W:number;
        var ultimateImage_H:number;
        if(this.imgWidth < this.canvasWidth && this.imgHeight < this.canvasHeight){
            ultimateCanvas_W = this.imgWidth;
            ultimateCanvas_H = this.imgHeight;
            ultimateImage_W = this.imgWidth;
            ultimateImage_H = this.imgHeight;
            const heightXwidth:Medidas = {
             N_canvasWidth:ultimateCanvas_W,
             N_canvasHeight:ultimateCanvas_H,
             N_imgWidth:ultimateImage_W,
             N_imgHeight:ultimateImage_H
         }
         return heightXwidth;
         }else{
            ultimateCanvas_W = this.canvasWidth;
            ultimateCanvas_H = this.canvasHeight;
            ultimateImage_W = this.canvasWidth;
            ultimateImage_H = this.canvasHeight;
            const heightXwidth:Medidas = {
             N_canvasWidth:ultimateCanvas_W,
             N_canvasHeight:ultimateCanvas_H,
             N_imgWidth:ultimateImage_W,
             N_imgHeight:ultimateImage_H
         }
         return heightXwidth;
         }

    }
    public newTam():Medidas{
        const uL: Medidas = {
            N_canvasWidth:0,
            N_canvasHeight:0,
            N_imgWidth:0,
            N_imgHeight:0
        }
        if(this.imgWidth < this.imgHeight){
            console.log('ENTRO EN ALTO > ANCHO')
           const medidas: Medidas = this.heightMasqWidth();
           return medidas; 
        }else if(this.imgWidth > this.imgHeight){
           const medidas: Medidas = this.widthXheight();
           return medidas;
        }else if(this.imgHeight === this.imgWidth){
           const medidas: Medidas = this.widthIgualheight();
           return medidas;
        }
        return uL;
          
    }

 }
 export default TamRenderCanvas;