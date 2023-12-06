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
  private prevImage: string | null = null;
  // Usar `!` para aserción de no nulidad, eliminando la necesidad de `declare` aquí.
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
    this.updateCanvasDimensions(this.context!.image);
    this.prevImage = this.context!.image;
  }

 /* componentDidUpdate(prevProps: CanvasImageProps) {
    if (prevProps.dimensions.width !== this.props.dimensions.width || 
        prevProps.dimensions.height !== this.props.dimensions.height) {
      this.setState({ dimensions: this.props.dimensions });
      this.updateCanvasDimensions(this.context!.image);
    }
  }*/
  componentDidUpdate() {
    const { image } = this.context!;
    const dimensionsChanged = this.props.dimensions.width !== this.state.dimensions.width ||
                              this.props.dimensions.height !== this.state.dimensions.height;
    
    if (image !== this.prevImage || dimensionsChanged) {
      this.updateCanvasDimensions(image);
      this.prevImage = image;
    }
  }

 
  updateCanvasDimensions = (imageSrc: string | null) => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const maxWidth = this.state.dimensions.width;
        const maxHeight = this.state.dimensions.height;
        
        let newWidth:number, newHeight:number;
  
        // Calcular la relación de aspecto de la imagen y del canvas
        const imgAspectRatio = width / height;
        const canvasAspectRatio = maxWidth / maxHeight;
  
        if (imgAspectRatio > canvasAspectRatio) {
          // Si la imagen es más ancha en proporción al canvas
          newWidth = maxWidth;
          newHeight = maxWidth / imgAspectRatio;
        } else {
          // Si la imagen es más alta en proporción al canvas
          newHeight = maxHeight;
          newWidth = maxHeight * imgAspectRatio;
        }
  
        this.setState({ dimensions: { width: newWidth, height: newHeight } }, () => {
          const canvas = this.canvasRef.current;
          if (canvas) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, newWidth, newHeight);
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
            }
          }
        });
      };
      img.src = imageSrc;
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
