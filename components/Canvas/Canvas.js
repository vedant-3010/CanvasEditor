import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#f0f0f0',
      preserveObjectStacking: true,
      selection: true,
    });

    canvasInstance.current = canvas;

    canvas.selection = true;
    canvas.set({ selectionColor: 'rgba(0,123,255,0.3)', selectionLineWidth: 1 });

    canvas.on('object:moving', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    canvas.on('object:scaling', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    canvas.on('object:rotating', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    return () => {
      canvas.dispose();
    };
  }, [width, height]);

  return <canvas ref={canvasRef} className="border border-gray-400" />;
};

export default Canvas;
