import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import 'tailwindcss/tailwind.css';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { FlipToBack, RadioButtonChecked } from '@mui/icons-material';

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
  const canvasInstance = useRef(null); // Reference to the fabric.Canvas instance

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: '#f0f0f0',
      preserveObjectStacking: true,
      selection: true,
    });

    canvasInstance.current = canvas; // Assign the canvas instance to the ref

    // Function to add image from local device to the canvas
    const addImageFromDevice = (file) => {
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

    // Event listener for file input change
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        addImageFromDevice(file);
      }
    };

    // Add event listener for file input change
    fileInputRef.current.addEventListener('change', handleFileInputChange);

    // Enable object interaction
    canvas.selection = true;
    canvas.set({ selectionColor: 'rgba(0,123,255,0.3)', selectionLineWidth: 1 });

    // Enable object movement
    canvas.on('object:moving', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    // Enable object resizing
    canvas.on('object:scaling', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    // Enable object rotation
    canvas.on('object:rotating', (e) => {
      const obj = e.target;
      obj.setCoords();
    });

    // Cleanup function
    return () => {
      canvas.dispose();
      fileInputRef.current.removeEventListener('change', handleFileInputChange);
    };
  }, [canvasSize]);

  // Function to change the color of SVG elements
  const changeSVGColor = (color) => {
    const canvas = canvasInstance.current; // Access the canvas instance from the ref
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

  // Function to handle canvas size change
  const handleCanvasSizeChange = (e) => {
    const { value } = e.target;
    const newSize = parseInt(value);
    setCanvasSize({ width: newSize, height: newSize });
  };

  return (
    <div className="fabric-canvas-container flex flex-col h-screen">
      <div className="bg-gray-200 relative flex h-16 items-center justify-evenly px-4">
        <div className="flex items-center">
          <label htmlFor="file-input" className="flex items-center space-x-2 cursor-pointer" title="Choose File">
            <RadioButtonChecked/>
            <span className="text-gray-600">Choose File</span>
            <input id="file-input" type="file" ref={fileInputRef} className="hidden" />
          </label>
          <label htmlFor="canvas-size" className="text-gray-600 ml-4">Canvas Size:</label>
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
        <div className="flex items-center space-x-2">
          <button
            title="Bring Forward"
            className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full focus:outline-none"
            onClick={() => {
              const canvas = canvasInstance.current; // Access the canvas instance from the ref
              const activeObjects = canvas.getActiveObjects();
              if (activeObjects.length > 0) {
                activeObjects.forEach((obj) => {
                  canvas.bringForward(obj);
                });
                canvas.discardActiveObject();
                canvas.requestRenderAll();
              }
            }}
          >
            <FlipToFrontIcon />
          </button>
          <button
            title="Send to Back"
            className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full focus:outline-none"
            onClick={() => {
              const canvas = canvasInstance.current; // Access the canvas instance from the ref
              const activeObjects = canvas.getActiveObjects();
              if (activeObjects.length > 0) {
                activeObjects.forEach((obj) => {
                  canvas.sendToBack(obj);
                });
                canvas.discardActiveObject();
                canvas.requestRenderAll();
              }
            }}
          >
            <FlipToBack />
          </button>
          <input
            type="color"
            onChange={(e) => changeSVGColor(e.target.value)}
            className="border border-gray-400 p-1 rounded focus:outline-none"
          />
        </div>
      </div>
      <div className="canvas-container flex justify-center items-center flex-grow">
        <canvas ref={canvasRef} className="border border-gray-400" />
      </div>
    </div>
  );
};

export default FabricCanvas;

