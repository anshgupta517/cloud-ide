import "./App.css";
import Terminal from "./components/terminal";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect, useState } from "react";
import FileTree from "./components/tree";
import socket from "./socket";
import AceEditor from 'react-ace'


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"


const App = () => {

    const [fileTree, setFileTree] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [code, setCode] = useState('');
    const fetchFileTree = async () => {
      try {
        const response = await fetch('http://localhost:3000/files');
        if (!response.ok) {
          throw new Error('Failed to fetch file tree');
        }
        const data = await response.json();
        setFileTree(data);
      } catch (error) {
        console.error('Error fetching file tree:', error);
      }
    };

    useEffect(() => {
      fetchFileTree();
    }, []);

    useEffect(() => {
      const handleFileChange = () => {
        fetchFileTree();
      };

      socket.on('file:change', handleFileChange);
      return () => {
        socket.off('file:change', handleFileChange);
      };
    }, []);

    

    useEffect(() => {
      if(selectedFile && code){
      console.log(selectedFile, code)
      socket.emit('file:change', { 
        filepath: selectedFile.replaceAll("/tree", ""),
        content: code });
      }
    }
    ,[code])


  return (
    <ErrorBoundary>
      <div className="playground-container">
        <div className="editor-container">
          <div className="files">
            {fileTree && <FileTree  style ={{ cursor: "pointer"}} onselect={(path) => {setSelectedFile(path)}} tree={fileTree} />}
          </div>
          <div className="editor">
            {selectedFile && <p style={{ color: "yellow" }}>{selectedFile.replaceAll("/tree/", ">")}</p>}
            <AceEditor
                value={code}
                onChange={setCode}></AceEditor>
          </div>
        </div>
        <div className="terminal-container">
          <Terminal />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;


