import React from 'react';
import '../styles/ColorToolbar.css';

// Define a set of vibrant background colors that contrast well with dark text
const colorOptions = [
  { name: 'Cream', value: '#FFF9C4' },
  { name: 'Mint', value: '#B2DFDB' },
  { name: 'Blue', value: '#BBDEFB' },
  { name: 'Lavender', value: '#D1C4E9' },
  { name: 'Green', value: '#C8E6C9' },
  { name: 'Purple', value: '#E1BEE7' },
  { name: 'Cyan', value: '#B2EBF2' },
  { name: 'Orange', value: '#FFE0B2' },
];

interface ColorToolbarProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorToolbar: React.FC<ColorToolbarProps> = ({ currentColor, onColorChange }) => {
  return (
    <div className="color-toolbar">
      <div className="color-options">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={`color-option ${currentColor === color.value ? 'active' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorChange(color.value)}
            title={color.name}
            aria-label={`Set background to ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorToolbar; 