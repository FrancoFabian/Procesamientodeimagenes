import React, { Component } from 'react';
import { ModalContext } from './context/ModalProvider';

interface CanvasComponentState {
  dimensions: {
    width: number;
    height: number;
  };
}

class CanvasImage extends Component<{}, CanvasComponentState> {
  static contextType = ModalContext;
  // Usar `!` para aserción de no nulidad, eliminando la necesidad de `declare` aquí.
 declare context: React.ContextType<typeof ModalContext>;

  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: {}) {
    super(props);
    this.canvasRef = React.createRef<HTMLCanvasElement>();
    this.state = {
      dimensions: {
        width: 0,
        height: 0
      }
    };
  }

 
  componentDidMount() {
    this.updateCanvasDimensions(this.context!.image);
  }

  componentDidUpdate() {
    // Si la URL de la imagen en el contexto cambia, actualiza el canvas.
    this.updateCanvasDimensions(this.context!.image);
  }

  updateCanvasDimensions = (imageSrc: string | null) => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        this.setState({ dimensions: { width, height } }, () => {
          const canvas = this.canvasRef.current;
          if (canvas) {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
            }
          }
        });
      };
      img.src = imageSrc;
    }
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        style={{
          width: `${this.state.dimensions.width}px`,
          height: `${this.state.dimensions.height}px`,
          border: '1px solid black' // Opcional para visualización
        }}
      />
    );
  }
}

CanvasImage.contextType = ModalContext;

export default CanvasImage;
