import React, { useEffect, useRef, useState, useContext } from 'react';
import './styles/CanvasPro.css';
import CanvasImage from './CanvasImage';
import { ModalContext } from './context/ModalProvider';

const CanvasPro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (modalContext?.image && dimensions.width && dimensions.height) {
      // Este efecto se activa cuando la imagen cambia y las dimensiones son válidas.
    }
  }, [modalContext?.image, dimensions]);
  useEffect(() => {
    if (modalContext?.image && modalContext?.zoom) {
      const img = new Image();
      img.onload = () => {
        const newWidth = img.width * (modalContext.zoom / 100);
        const newHeight = img.height * (modalContext.zoom / 100);
        setDimensions({ width: newWidth, height: newHeight });
      };
      img.src = URL.createObjectURL(modalContext.image);
    }
  }, [modalContext?.image, modalContext?.zoom]);

  return (
    <div ref={containerRef} className="ContenedorCnavas">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <CanvasImage dimensions={dimensions}
        image={modalContext?.image}
        zoom={modalContext?.zoom}
        />
      )}
    </div>
  );
};
export default CanvasPro;
