import React, { useEffect, useRef } from 'react';
import { Editor } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import '../styles/MilkdownEditor.css';

interface MilkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const MilkdownEditor: React.FC<MilkdownEditorProps> = ({ 
  initialContent = '# Quick Note\n\nStart typing here...', 
  onChange 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<Editor | null>(null);

  useEffect(() => {
    let unmounted = false;
    let loading = true;
    
    const create = async () => {
      if (!editorRef.current || unmounted) return;

      try {
        // Clean up previous instance if it exists
        if (editorInstanceRef.current) {
          await editorInstanceRef.current.destroy();
          editorInstanceRef.current = null;
        }

        // Create a new editor
        const editor = Editor.make();
        
        // Configure plugins
        editor.use(nord);
        editor.use(commonmark);
        editor.use(listener);
        editor.use(history);
        editor.use(clipboard);
        
        // Get the instance
        const instance = await editor.create();
        
        // Keep a reference to destroy on cleanup
        if (!unmounted) {
          editorInstanceRef.current = instance;
          
          // Setup listener for content changes
          const ctx = instance.ctx;
          const listenerManager = ctx.get(listenerCtx);
          listenerManager.markdownUpdated((_, markdown) => {
            if (onChange && typeof markdown === 'string') {
              onChange(markdown);
            }
          });
          
          loading = false;
        } else {
          // If unmounted during initialization, destroy the editor
          instance.destroy().catch(console.error);
        }
      } catch (error) {
        console.error('Error creating Milkdown editor:', error);
        loading = false;
      }
    };

    // Mount the editor to the DOM node
    if (editorRef.current) {
      create();
    }

    return () => {
      unmounted = true;
      // Clean up on unmount
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy().catch(console.error);
      }
    };
  }, [initialContent, onChange]);

  return (
    <div className="milkdown-editor-container">
      <div className="milkdown-editor" ref={editorRef} />
    </div>
  );
};

export default MilkdownEditor; 