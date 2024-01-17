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
  image: File | undefined | null; // Añadir prop para la imagen
  zoom: number | null | undefined;
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
    
  }
  componentDidMount() {
    this.prevImage = this.context!.image;
    //this.resetCanvasSize();
    this.loadOriginalImage();
  }

  componentDidUpdate(prevProps: CanvasImageProps) {
  const { image, selectedFilter ,isSettings} = this.context!;
   console.log(selectedFilter+"FILTROOOOOOO")
  // Verifica si la imagen ha cambiado
  
  if (this.props.zoom !== prevProps.zoom || this.props.image !== prevProps.image) {
    this.loadOriginalImage();
    this.resetCanvasSize();
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

resetCanvasSize = () => {
  const img = this.originalImage;
  if (!img) return;

  const { zoom } = this.props;
  const canvas = this.canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d',{ willReadFrequently: true });
  if (!ctx) return;
  if(zoom !== null && zoom !== undefined){
    // Calcula las nuevas dimensiones
  const newWidth = img.width * zoom / 100;
  const newHeight = img.height * zoom / 100;

  // Ajusta el tamaño del canvas
  canvas.width = newWidth;
  canvas.height = newHeight;

  // Redibuja la imagen en el canvas
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

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
  const { width, height } = this.props.dimensions; // Usa props en lugar de state
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

