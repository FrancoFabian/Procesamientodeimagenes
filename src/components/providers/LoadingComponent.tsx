import React, { useContext } from 'react';
import { LoadingContext } from './LoadingContext'; // Asumiendo que lo guardaste aquí
import './LoadingComponent.css';

export const LoadingComponent = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-wrapper">
        <i className="bi bi-images"></i>
        <div className="electron electron-red"></div>
        <div className="electron electron-green"></div>
        <div className="electron electron-blue"></div>
      </div>
      Cargando...
    </div>
  );
};
