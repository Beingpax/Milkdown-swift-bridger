import React, { useState, useEffect, useRef } from 'react';
import '../styles/SimpleMarkdownEditor.css';

interface SimpleMarkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const SimpleMarkdownEditor: React.FC<SimpleMarkdownEditorProps> = ({
  initialContent = '# Quick Note\n\nStart typing here...',
  onChange
}) => {
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  // Simple preview of rendered markdown
  const renderPreview = () => {
    // First pass: Replace headers
    let html = content
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>');

    // Replace bold text
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Replace bullet lists
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>').replace(/<li>(.+)<\/li>\n<li>/g, '<li>$1</li>\n<li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Replace numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    // Replace links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    
    // Replace code blocks
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    // Replace newlines with <br> for simple line breaks
    html = html.replace(/\n/g, '<br>');

    return { __html: html };
  };

  return (
    <div className="markdown-editor-container">
      <div className="markdown-editor-split">
        <textarea
          ref={textareaRef}
          className="markdown-editor-textarea"
          value={content}
          onChange={handleChange}
          placeholder="Type markdown here..."
        />
        <div 
          className="markdown-editor-preview"
          dangerouslySetInnerHTML={renderPreview()}
        />
      </div>
    </div>
  );
};

export default SimpleMarkdownEditor; 