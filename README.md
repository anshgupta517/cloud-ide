
# cloud-ide

A lightweight open-source IDE viewable from web browsers. ☁️💻 It will feature essential coding functionalities, such as an editor, terminal, and file system, allowing code development at ease, all without the need for local installations. 🎉

![Screenshot From 2025-04-24 23-15-09](https://github.com/user-attachments/assets/bc0771d6-7f16-4f7b-9bb1-908350e56a45)


### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)

### Key Features

*   ***Code Editor:*** A fully functional code editor with syntax highlighting and other essential features.
*   ***Integrated Terminal:*** Access a terminal directly from your web browser.
*   ***File System Explorer:*** Easily navigate and manage your project files.
*   ***Lightweight:*** No local installations required, making it accessible from any device with a web browser.

### Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/anshgupta517/cloud-ide.git
    cd cloud-ide
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm start
    ```

    This will typically start the application on `http://localhost:3000` (or a similar port).  Check the console output for the exact address.

### Usage

Once the development server is running, open your web browser and navigate to the address provided. You should see the cloud-ide interface.  From there, you can:

*   Create, open, and edit files.
*   Run commands in the integrated terminal.
*   Navigate your project's file system.

### Project Structure

```
cloud-ide/
├── README.md               # This file
├── client/                 # Frontend code (React, Vite)
│   ├── README.md           # Client-specific README
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML entry point
│   ├── package-lock.json   # Client dependencies lockfile
│   ├── package.json        # Client dependencies and scripts
│   ├── vite.config.js      # Vite configuration
│   ├── .gitignore          # Client-specific ignored files
│   ├── public/             # Static assets
│   └── src/                # Client source code
│       ├── App.css           # Main application styles
│       ├── App.jsx           # Main application component
│       ├── index.css         # Global styles
│       ├── main.jsx          # Entry point for React
│       ├── socket.js         # Socket.IO connection logic
│       ├── components/       # Reusable React components
│       │   ├── ErrorBoundary.jsx # Error boundary component
│       │   ├── terminal.jsx      # Terminal component
│       │   └── tree.jsx          # File tree component
│       ├── css/              # Component-specific styles
│       │   └── terminal.css    # Terminal styles
│       └── util/             # Utility functions
│           └── filepath.jsx    # Filepath utility functions
└── server/                 # Backend code (Node.js, Express)
    ├── index.js            # Server entry point
    ├── package-lock.json   # Server dependencies lockfile
    ├── package.json        # Server dependencies and scripts
    ├── .gitignore          # Server-specific ignored files
    └── user/                # User-related data (example)
        ├── h               # Example user directory
        └── package.json    # User-specific dependencies (if any)
```

**Explanation of Key Directories:**

*   **`client/`:**  Contains the frontend code, built with React and Vite.  It includes components for the terminal, file tree, and error handling.  `socket.js` handles communication with the backend server.
*   **`server/`:** Contains the backend code, built with Node.js and Express.  `index.js` is the main server file. The `user/` directory seems to be a placeholder for user-specific data or configurations.

### Technologies Used

*   [React](https://reactjs.org/) (Frontend)
*   [Vite](https://vitejs.dev/) (Frontend Build Tool)
*   [Node.js](https://nodejs.org/) (Backend)
*   [Express](https://expressjs.com/) (Backend Framework)
*   [Socket.IO](https://socket.io/) (Real-time communication)
*   [@xterm/xterm](https://xtermjs.org/) (Terminal emulator library - used in the terminal component)
*   [react-ace](https://github.com/securingsincity/react-ace) (Code editor component)
*   [chokidar](https://github.com/paulmillr/chokidar) (File system watcher)
*   [cors](https://github.com/expressjs/cors) (Cross-Origin Resource Sharing)
*   [node-pty](https://github.com/microsoft/node-pty) (Pseudo-terminal manager)

*Note: This list may be incomplete and will be updated as the project evolves.*

### Dependencies

**Server-side:**

```json
{
  "dependencies": {
    "chokidar": "^4.0.3",
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "fs": "^0.0.1-security",
    "node-pty": "^1.0.0",
    "socket.io": "^4.8.1"
  }
}
```

**Client-side:**

```json
{
  "dependencies": {
    "@xterm/xterm": "^5.5.0",
    "react": "^19.0.0",
    "react-ace": "^14.0.1",
    "react-dom": "^19.0.0",
    "socket.io-client": "^4.8.1"
  }
}
```

### Contributors

*   anshgupta517

### Future Enhancements

*   Support for multiple programming languages.
*   Debugging capabilities.
*   Collaboration features (e.g., shared editing).
*   Integration with version control systems (e.g., Git).
*   Customizable themes and settings.
