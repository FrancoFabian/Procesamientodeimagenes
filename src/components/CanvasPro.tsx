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

  return (
    <div ref={containerRef} className="ContenedorCnavas">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <CanvasImage dimensions={dimensions} />
      )}
    </div>
  );
};
export default CanvasPro;
