import { useRef } from 'react';

const FileInput = ({ onFileInputChange }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileInputChange(file);
    }
  };

  return (
    <label htmlFor="file-input" className="flex items-center space-x-2 cursor-pointer" title="Choose File">
      <RadioButtonChecked />
      <span className="text-gray-600">Choose File</span>
      <input id="file-input" type="file" ref={fileInputRef} className="hidden" onChange={handleFileInputChange} />
    </label>
  );
};

export default FileInput;
