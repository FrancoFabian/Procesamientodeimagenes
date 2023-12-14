import React, { Component } from 'react';
import { ModalContext } from './context/ModalProvider';

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

  private canvasRef: React.RefObject<HTMLCanvasElement>;

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
    this.resetCanvasSize();
  }

  componentDidUpdate() {
    const { image } = this.context!;
    
    if (image !== this.prevImage) {
      this.resetCanvasSize();
      this.prevImage = image;
    }
  }
  

  
  // ... tus importaciones y setup ...

 /*resetCanvasSize = async () => {
  const { image } = this.context!;
  if (image instanceof Blob) {
      const img = new Image();
      img.onload = async () => {
          const maxWidth = this.props.dimensions.width - 10;
          const maxHeight = this.props.dimensions.height - 10;
          const canvasAspectRatio = maxWidth / maxHeight;
          const imgAspectRatio = img.width / img.height;
          let newWidth:number, newHeight:number;

          if (imgAspectRatio > canvasAspectRatio) {
              newWidth = maxWidth;
              newHeight = maxWidth / imgAspectRatio;
          } else {
              newHeight = maxHeight;
              newWidth = maxHeight * imgAspectRatio;
          }

          this.setState({ dimensions: { width: newWidth, height: newHeight } }, async () => {
              const formData = new FormData();
              formData.append('width', newWidth.toString());
              formData.append('height', newHeight.toString());
              formData.append('file', image);

              const response = await fetch('http://127.0.0.1:8000/api/imageRedimensionation', {
                  method: 'POST',
                  body: formData,
              });

              const blob = await response.blob();
              const objectURL = URL.createObjectURL(blob);

              const resizedImage = new Image();
              resizedImage.onload = () => {
                  const canvas = this.canvasRef.current;
                  console.log("imgWIDTH"+resizedImage.width+"imgHEIGHT:"+resizedImage.height)
                  if (canvas) {
                      canvas.width = resizedImage.width;
                      canvas.height = resizedImage.height;
                      console.log("WIDTH"+canvas.width+" heigth: w"+canvas.height)
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                          ctx.imageSmoothingEnabled = true;
                          ctx.imageSmoothingQuality = 'high';  // Utilizar calidad alta para el escalado
                          ctx.clearRect(0, 0, resizedImage.width, resizedImage.height);
                          ctx.drawImage(resizedImage, 0, 0, resizedImage.width, resizedImage.height);
                      }
                  }
                  URL.revokeObjectURL(objectURL);
              };
              resizedImage.src = objectURL;
          });
      };
      img.src = URL.createObjectURL(image);
  } else {
      console.error("La imagen proporcionada no es un Blob o File");
  }
};*/


resetCanvasSize = async () => {
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
          const ctx = canvas.getContext('2d');
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

