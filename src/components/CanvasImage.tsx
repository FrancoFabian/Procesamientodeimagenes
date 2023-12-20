import React, { Component } from 'react';
import { ModalContext } from './context/ModalProvider';
import { ImageType } from "./filters/ImageType";
interface CanvasComponentState {
  dimensions: {
    width: number;
    height: number;
  };
}

interface CanvasImageProps {
  dimensions: {
    width: number;
    height: number;
  };
}


class CanvasImage extends Component<CanvasImageProps, CanvasComponentState> {
  static contextType = ModalContext;
  private prevImage: File | null = null;
  declare context: React.ContextType<typeof ModalContext>;
  private prevSelectedFilter: Function | null = null; // Nueva propiedad privada
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private originalImage: HTMLImageElement | null = null

  constructor(props: CanvasImageProps) {
    super(props);
    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.state = {
      dimensions: {
        width: props.dimensions.width,
        height: props.dimensions.height
      }
    };
  }
  componentDidMount() {
    this.prevImage = this.context!.image;
    //this.resetCanvasSize();
    this.loadOriginalImage();
  }

  componentDidUpdate() {
  const { image, selectedFilter ,isSettings} = this.context!;
   console.log(selectedFilter+"FILTROOOOOOO")
  // Verifica si la imagen ha cambiado
  if (image !== this.prevImage) {
   // this.resetCanvasSize();
   this.loadOriginalImage();
    this.prevImage = image;
  }

  // Verifica si el filtro seleccionado ha cambiado
  if (selectedFilter && this.prevSelectedFilter !== selectedFilter) {
    console.log("ANTES DE APLICAR EL FILTRO")
    console.log(isSettings)
    console.log(selectedFilter+"FILTROOOOOOO2222222")
    this.applyFilter(selectedFilter);
    this.prevSelectedFilter = selectedFilter; // Actualiza prevSelectedFilter
  }
}

resetCanvasSize =  () => {
  const { image } = this.context!;
  if (image instanceof Blob) {
    const img = new Image();
    img.onload = () => {
      const maxWidth = this.props.dimensions.width;
      const maxHeight = this.props.dimensions.height;
      const canvasAspectRatio = maxWidth / maxHeight;
      const imgAspectRatio = img.width / img.height;
      let newWidth:number, newHeight:number;

      if (imgAspectRatio > canvasAspectRatio) {
        // La imagen es más ancha que el canvas
        newWidth = maxWidth;
        newHeight = maxWidth / imgAspectRatio;
      } else {
        // La imagen es más alta que el canvas
        newHeight = maxHeight;
        newWidth = maxHeight * imgAspectRatio;
      }

      // Ahora actualiza el estado y dibuja la imagen en el canvas
      this.setState({ dimensions: { width: newWidth, height: newHeight } }, () => {
        const canvas = this.canvasRef.current;
        if (canvas) {
          canvas.width = newWidth;
          canvas.height = newHeight;
          console.log("WIDTH: "+canvas.width+" HEIGHT : "+canvas.height)
          const ctx = canvas.getContext('2d',{ willReadFrequently: true });
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high'; // Asegurarse de que la calidad de la imagen sea alta
            ctx.clearRect(0, 0, newWidth, newHeight);
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
          }
        }
      });
    };
    img.src = URL.createObjectURL(image);
  } else {
    console.error("La imagen proporcionada no es un Blob o File");
  }
};
loadOriginalImage = () => {
  const { image } = this.context!;
  if (image instanceof Blob) {
    const img = new Image();
    img.onload = () => {
      this.originalImage = img;
      this.resetCanvasSize();
    };
    img.src = URL.createObjectURL(image);
  }
};


applyFilter = (filterFunction: Function) => {
  const canvas = this.canvasRef.current;
  const { gammaValues,isSettings } = this.context!; // Obtener los valores de Gamma del contexto

  if (canvas && this.originalImage) {
    const ctx = canvas.getContext('2d',{ willReadFrequently: true });
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.originalImage, 0, 0, canvas.width, canvas.height);
      if (typeof filterFunction !== 'function') {
        console.error("El filtro proporcionado no es una función válida.");
        return;
      }
      
      // Crear una instancia de ImageType con la imagen original
      const imageType = new ImageType(ctx, this.originalImage, canvas.width, canvas.height);
      var filteredImage;
      if(isSettings === false){
         filteredImage = filterFunction(imageType);
      }else{
         filteredImage = filterFunction(imageType,gammaValues);
      }
      //
      
      imageType.imageArray2DtoData(ctx, filteredImage);
    }
  }
};



  render() {
    const { width, height } = this.state.dimensions;
    return (
      <canvas
        ref={this.canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    );
  }
}

CanvasImage.contextType = ModalContext;

export default CanvasImage;

