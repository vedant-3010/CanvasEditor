import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { FlipToBack } from '@mui/icons-material';

const CanvasControls = ({ onBringForward, onSendToBack, onColorChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        title="Bring Forward"
        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full focus:outline-none"
        onClick={onBringForward}
      >
        <FlipToFrontIcon />
      </button>
      <button
        title="Send to Back"
        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-700 text-white rounded-full focus:outline-none"
        onClick={onSendToBack}
      >
        <FlipToBack />
      </button>
      <input
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
        className="border border-gray-400 p-1 rounded focus:outline-none"
      />
    </div>
  );
};

export default CanvasControls;
