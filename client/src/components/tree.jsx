const FileTreeNode = ({ filename, nodes,path ,onselect }) => {
  
  const isDirectory = nodes && (Object.keys(nodes).length > 0);
  const isTreeKeyword = filename === 'tree'
   
  
    
  
    return (
      <div onClick={(e)=>{
        e.stopPropagation()
        if(isDirectory){return;}
        onselect(path)
      }} style={{ marginLeft: "10px" }}>
       <p style={{ color: isDirectory ? "yellow" : "white" , display: isTreeKeyword ? "none" : "block"}}> {filename}</p>
  {nodes && filename !== 'node_modules' && <ul>

          {Object.keys(nodes).map((child) => {
            return(
         <li key={child}>
              <FileTreeNode onselect={onselect} filename={child} path={path + '/' + child} nodes={nodes[child]} />
            </li>
)})}
        </ul>}
      </div>
    );
  };

const FileTree = ({tree,onselect}) => {
    // console.log(tree)
    return(
        <FileTreeNode
         filename= '/'
         onselect={onselect}
         path = ''
         nodes = {tree}
         />
    )
}

export default FileTree