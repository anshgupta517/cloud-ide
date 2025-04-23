const FileTreeNode = ({ filename, nodes }) => {
   const isDirectory = nodes && Object.keys(nodes).length > 0;
  
    
  
    return (
      <div style={{ marginLeft: "10px" }}>
       <p style={{ color: isDirectory ? "yellow" : "black" }}> {filename}</p>
       {nodes && <ul>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode filename={child} nodes={nodes[child]} />
            </li>
          ))}
        </ul>}
      </div>
    );
  };

const FileTree = ({tree}) => {
    // console.log(tree)
    return(
        <FileTreeNode
         filename= '/'
         nodes = {tree}
         />
    )
}

export default FileTree