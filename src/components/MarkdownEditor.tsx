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
    });

    // Clean up
    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
    };
  }, [defaultValue, onChange]);

  return <div ref={editorRef} className="milkdown-editor" />;
} 