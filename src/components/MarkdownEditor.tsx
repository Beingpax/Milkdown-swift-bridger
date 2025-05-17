import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

interface MarkdownEditorProps {
  defaultValue?: string;
  onChange?: (markdown: string) => void;
}

export default function MarkdownEditor({ defaultValue = '', onChange }: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<Crepe | null>(null);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    // Create a new Crepe instance
    const crepe = new Crepe({
      root: editorRef.current,
      defaultValue,
    });

    // Store the Crepe instance
    crepeRef.current = crepe;

    // Create the editor
    crepe.create().then(() => {
      console.log('Milkdown editor created');
      setEditorReady(true);
      
      // Apply styles to Milkdown elements to make them fill the container
      if (editorRef.current) {
        const milkdownElement = editorRef.current.querySelector('.milkdown');
        if (milkdownElement instanceof HTMLElement) {
          milkdownElement.style.width = '100%';
          milkdownElement.style.height = '100%';
          milkdownElement.style.boxSizing = 'border-box';
          
          // Find the editor content element and make it fill the available space
          const editorElement = milkdownElement.querySelector('.editor');
          if (editorElement instanceof HTMLElement) {
            editorElement.style.width = '100%';
            editorElement.style.height = '100%';
            editorElement.style.maxWidth = '100%';
            editorElement.style.padding = '0';
            editorElement.style.margin = '0';
          }
        }
      }
    });

    // Clean up
    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
    };
  }, [defaultValue, onChange]);

  return (
    <div 
      ref={editorRef} 
      style={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }} 
    />
  );
} 