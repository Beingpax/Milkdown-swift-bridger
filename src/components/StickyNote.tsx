import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content] = useState('# Quick Note\n\nType your note here...');

  return (
    <div className="sticky-note">
      <div className="sticky-note-header" data-tauri-drag-region>
        <div className="sticky-note-title">Quick Sticky Node</div>
      </div>
      <div className="sticky-note-content">
        <MarkdownEditor defaultValue={content} />
      </div>
    </div>
  );
} 