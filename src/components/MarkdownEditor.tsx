import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!editorRef.current) return;

    const editorRoot = document.createElement('div');
    editorRoot.className = 'editor-root';
    editorRef.current.appendChild(editorRoot);

    // Create a new Crepe instance
    const crepe = new Crepe({
      root: editorRoot,
      defaultValue,
    });

    // Store the Crepe instance
    crepeRef.current = crepe;

    // Create the editor
    crepe.create().then(() => {
      console.log('Milkdown editor created');
      
      // Set up a listener for markdown changes if needed
      if (onChange) {
        // This would require additional setup with the Milkdown listener plugin
        // For simplicity, we'll implement this later if needed
      }
    });

    // Clean up
    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
      if (editorRef.current?.contains(editorRoot)) {
        editorRef.current.removeChild(editorRoot);
      }
    };
  }, [defaultValue, onChange]);

  return <div ref={editorRef} className="milkdown-editor-container" />;
} 