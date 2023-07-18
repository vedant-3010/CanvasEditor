import { useState } from 'react';
import Canvas from '../Canvas';
import FileInput from '../FileInput';
import CanvasControls from '../CanvasControls';

const FabricCanvas = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });

  const addImageFromDevice = (file) => {
    const canvas = canvasInstance.current;
    fabric.Image.fromURL(URL.createObjectURL(file), (img) => {
      const aspectRatio = img.width / img.height;
      const newWidth = canvasSize.width * 0.8;
      const newHeight = newWidth / aspectRatio;

      img.set({
        left: (canvasSize.width - newWidth) / 2,
        top: (canvasSize.height - newHeight) / 2,
        scaleX: newWidth / img.width,
        scaleY: newHeight / img.height,
      });

      canvas.add(img);
    });
  };

  const handleFileInputChange = (file) => {
    addImageFromDevice(file);
  };

  const handleCanvasSizeChange = (e) => {
    const { value } = e.target;
    const newSize = parseInt(value);
    setCanvasSize({ width: newSize, height: newSize });
  };

  const handleBringForward = () => {
    const canvas = canvasInstance.current;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        canvas.bringForward(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const handleSendToBack = () => {
    const canvas = canvasInstance.current;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        canvas.sendToBack(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const handleColorChange = (color) => {
    const canvas = canvasInstance.current;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        if (obj.isType('svg')) {
          const svgElement = obj.getElement();
          svgElement.setAttribute('fill', color);
          obj.setElement(svgElement);
        }
      });
      canvas.requestRenderAll();
    }
  };

  const canvasInstance = useState(null);

  return (
    <div className="fabric-canvas-container flex flex-col h-screen">
      <div className="bg-gray-200 relative flex h-16 items-center justify-evenly px-4">
        <div className="flex items-center">
          <FileInput onFileInputChange={handleFileInputChange} />
          <label htmlFor="canvas-size" className="text-gray-600 ml-4">
            Canvas Size:
          </label>
          <input
            type="number"
            id="canvas-size"
            min="100"
            max="1000"
            value={canvasSize.width}
            onChange={handleCanvasSizeChange}
            className="border border-gray-400 p-2 w-20 ml-2"
          />
        </div>
        <CanvasControls
          onBringForward={handleBringForward}
          onSendToBack={handleSendToBack}
          onColorChange={handleColorChange}
        />
      </div>
      <div className="canvas-container flex justify-center items-center flex-grow">
        <Canvas width={canvasSize.width} height={canvasSize.height} />
      </div>
    </div>
  );
};

export default FabricCanvas;