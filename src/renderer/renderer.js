import ReactDOM from "react-dom";
import Board from "./components/Board";
import FileExplorer from "./components/FileExplorer";
import "bootstrap/dist/css/bootstrap.css";
import "../../public/index.css";
import { ReactFlowProvider } from "react-flow-renderer";
import { useEffect, useState } from "react";


const App = () => {
    const [showFileExplorer, setShowFileExplorer] = useState(false);
    const [currentPath, setCurrentPath] = useState(null);
    const [currentFiles, setCurrentFiles] = useState(null);

    const toggleFileExplorer = () => {
        setShowFileExplorer(prev => !prev);

    }
    
    const handleKeyDown = (e) => {
        if(e.key === "Escape")
            toggleFileExplorer();
    }

    const handleOpenDirectory = (path, files) => {
        setCurrentPath(path);
        setCurrentFiles(files);
    }

    const initListeners = () => {
        document.addEventListener("keydown", handleKeyDown, false);
        window.main.onOpenDirectory(handleOpenDirectory);
    }

    const removeListeners = () => {
        document.removeEventListener("keydown", handleKeyDown, false);
        window.main.removeOnOpenDirectory();
    }

    useEffect(() => {
        initListeners();
        return removeListeners;
    }, []);

    return (
        <ReactFlowProvider>
            <FileExplorer show={showFileExplorer} onHide={toggleFileExplorer} dirPath={currentPath} files={currentFiles}/>
            <Board />
        </ReactFlowProvider>
    );
}

function render() {
    ReactDOM.render(<App />, document.getElementById("root"));
}

render();