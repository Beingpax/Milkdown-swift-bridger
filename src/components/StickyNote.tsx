import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content, setContent] = useState('# Quick Note\n\nType your note here...');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="sticky-note">
      <div className="sticky-note-header">
        <div className="sticky-note-title">Quick Sticky Node</div>
      </div>
      <div className="sticky-note-content">
        <MarkdownEditor 
          defaultValue={content} 
          onChange={handleContentChange} 
        />
      </div>
    </div>
  );
} 