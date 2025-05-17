import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

interface MilkdownEditorProps {
  defaultValue?: string;
  onChange?: (markdown: string) => void;
}

export default function MilkdownEditor({ defaultValue = '', onChange }: MilkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const crepeRef = useRef<Crepe | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    const root = editorRef.current;
    
    const crepe = new Crepe({
      root,
      defaultValue,
    });

    crepe.create().then(() => {
      setIsReady(true);
      console.log('Milkdown Crepe editor created');
      
      // We'll need to implement change detection another way
      // Since the onChange prop isn't directly supported by Crepe
    });

    crepeRef.current = crepe;

    // Cleanup on component unmount
    return () => {
      if (crepeRef.current) {
        crepeRef.current.destroy();
        crepeRef.current = null;
      }
    };
  }, [defaultValue]);

  return (
    <div className="milkdown-editor-container">
      <div ref={editorRef} className="milkdown-editor"></div>
    </div>
  );
} 