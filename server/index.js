const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const os = require("os");
const cors = require("cors");
const fs = require("fs");
const pathModule = require("path");
const chokidar = require("chokidar");

const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chokidar.watch('./').on('all', (event, path) => {
  io.emit('file:change', { event, path });
});

var pty = require("node-pty");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: "./",
  env: process.env,
});

app.use(express.json());
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("terminal:write", (data) => {
    ptyProcess.write(data);
  });

  socket.on("disconnect", () => {
  console.log("User disconnected");
  });

  socket.on("file:change", async({filepath, content}) => {
    const safePath = pathModule.join(__dirname,  filepath);
    console.log(safePath)
    try {
      await fs.promises.writeFile(safePath, content);
    } catch (error) {
      console.error("Error writing file:", error);
      io.emit("file:error", { message: "Failed to write file", error: error.message });
    }
  });

});

ptyProcess.on("data", (data) => {
  io.emit("terminal:output", data);
});

ptyProcess.on("error", (error) => {
  console.error("PTY Error:", error);
  io.emit("terminal:error", error.message);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/files", async (req, res) => {
  const fileTree = await generateFileTree("./");
  res.json({ tree: fileTree });
});

app.get("/file-content", async (req, res) => {
  console.log("file-content");
  const filePath = req.query.path;
  console.log("Requested file path:", filePath);
  const safePath = pathModule.join(__dirname,  filePath);
  
  try {
    const stat = await fs.promises.stat(safePath);
    if (stat.isDirectory()) {
      return res.status(400).json({ message: 'Requested path is a directory, not a file.' });
    }
    const content = await fs.promises.readFile(safePath, 'utf-8');
    return res.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).json({ message: 'Failed to read file', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function generateFileTree(directory) {
  const tree = {};
  await buildTree(directory, tree);

  return tree;
}

async function buildTree(currentDirectory, currentTree) {
  try {
    const files = await fs.promises.readdir(currentDirectory);

    for (const file of files) {
      const filepath = pathModule.join(currentDirectory, file);
      const stat = await fs.promises.stat(filepath);

      if (stat.isDirectory()) {
        currentTree[file] = {};
        await buildTree(filepath, currentTree[file]);
      } else {
        currentTree[file] = null;
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
}
