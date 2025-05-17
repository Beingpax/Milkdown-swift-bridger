import { useState, useEffect, useRef } from 'react';
import '../styles/StickyNote.css';

export default function StickyNote() {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus the textarea when component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Auto-save implementation will go here in the future

  return (
    <div className="sticky-note">
      <div className="sticky-note-header">
        <div className="sticky-note-title">Quick Note</div>
      </div>
      <div className="sticky-note-content">
        <textarea
          ref={textareaRef}
          className="sticky-note-textarea"
          value={content}
          onChange={handleContentChange}
          placeholder="Type your note here..."
        />
      </div>
    </div>
  );
} 