import { useState, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import ColorToolbar from './ColorToolbar';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content] = useState('# Welcome to Quick Sticky Notes\n\nType your note here...');
  const [backgroundColor, setBackgroundColor] = useState('#FFF9C4'); // Default to cream

  // Save background color to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('qsnotes-bg-color', backgroundColor);
  }, [backgroundColor]);

  // Load background color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('qsnotes-bg-color');
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, []);

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div className="sticky-note" style={{ backgroundColor }}>
      <div className="sticky-note-content">
        <MarkdownEditor defaultValue={content} />
      </div>
      <ColorToolbar 
        currentColor={backgroundColor} 
        onColorChange={handleColorChange} 
      />
    </div>
  );
} 