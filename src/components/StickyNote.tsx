import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content] = useState('# Welcome to Quick Sticky Notes\n\nType your note here...');

  return (
    <div className="sticky-note">
      <div className="sticky-note-content">
        <MarkdownEditor defaultValue={content} />
      </div>
    </div>
  );
} 