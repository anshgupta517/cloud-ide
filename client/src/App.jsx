import "./App.css";
import Terminal from "./components/terminal";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect, useState } from "react";
import FileTree from "./components/tree";
import socket from "./socket";

const App = () => {

    const [fileTree, setFileTree] = useState({})
    const getFileTree = async () =>{
      const response = await fetch('http://localhost:3000/files')
      const result = await response.json()
      setFileTree(result)
    }

    useEffect(() => {
      getFileTree()
    }, [])

    useEffect(() => {
socket.on('file:change', (data) => {
    getFileTree()
})
return () => {
  socket.off('file:change')
}
    }, [])



  return (
    <ErrorBoundary>
      <div className="playground-container">
        <div className="editor-container">
          <div className="files">
            {fileTree && <FileTree tree={fileTree} />}
          </div>
          <div className="editor"></div>
        </div>
        <div className="terminal-container">
          <Terminal />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;


