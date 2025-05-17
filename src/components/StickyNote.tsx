import { useState } from 'react';
import MilkdownEditor from './MilkdownEditor';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content] = useState(`# Quick Note

Welcome to QuickStickyNodes!

- Write your notes here
- **Bold** text or *italic*
- Create [links](https://example.com)
- Make lists and more...

> Markdown formatting is supported
`);

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