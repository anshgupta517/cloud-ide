import "./App.css";
import Terminal from "./components/terminal";
import ErrorBoundary from "./components/ErrorBoundary";
import { useCallback, useEffect, useState } from "react";
import FileTree from "./components/tree";
import socket from "./socket";
import AceEditor from 'react-ace'


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"


const App = () => {

    const [fileTree, setFileTree] = useState({});
    const [selectedFile, setSelectedFile] = useState('');
    const [code, setCode] = useState('');
    const [content,setContent] = useState('')

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

    const handleSelectedFile = async (path) => {
      await setSelectedFile(path);
      console.log("Selected file:", selectedFile);
      fetchFileContent(path);
    };

    
    useEffect(() => {
      if(selectedFile && code){
      console.log(selectedFile, code)
      socket.emit('file:change', { 
        filepath: selectedFile.replaceAll("/tree", ""),
        content: code });
      }
    }
    ,[code])

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      // Clean up the socket connection on component unmount
      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }, []);

   
    
      const fetchFileContent = async (path) => {
        console.log("start");
        console.log(selectedFile)
        
        try {
          const response = await fetch(`http://localhost:3000/file-content?path=${path.replaceAll("/tree", "")}`);
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to fetch file content');
          }
          const result = await response.json();
          console.log("end:" + result.content);
          setCode(result.content);
        } catch (error) {
          console.error('Error fetching file content:', error);
        }
      };


  return (
    <ErrorBoundary>
      <div className="playground-container">
        <div className="editor-container">
          <div className="files">
            {fileTree && <FileTree  style ={{ cursor: "pointer"}} onselect={(path) => {handleSelectedFile(path); console.log("Selected file:", path)}} tree={fileTree} />}
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


