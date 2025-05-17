import { useEffect, useState } from "react";
import StickyNote from "./components/StickyNote";
import SimpleMarkdownEditor from "./components/SimpleMarkdownEditor";
import "./App.css";

function App() {
  const [useMarkdown, setUseMarkdown] = useState(false);
  const [content, setContent] = useState("");

  // Load the markdown editor by default after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setUseMarkdown(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="app-container">
      {useMarkdown ? (
        <SimpleMarkdownEditor 
          initialContent={content} 
          onChange={handleContentChange} 
        />
      ) : (
        <StickyNote />
      )}
    </div>
  );
}

export default App;
