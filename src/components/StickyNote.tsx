import { useState } from 'react';
import MilkdownEditor from './MilkdownEditor';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content, setContent] = useState('# Quick Note\n\nType your note here...');

  return (
    <div className="sticky-note">
      <div className="sticky-note-header">
        <div className="sticky-note-title">Quick Note</div>
      </div>
      <div className="sticky-note-content">
        <MilkdownEditor defaultValue={content} />
      </div>
    </div>
  );
} 