import { contextBridge, ipcRenderer } from "electron";

console.log("Preload: OK!");


export const api = {
    /* Listeners */
    onMarkdownChange: (callback) => {
        ipcRenderer.on("markdown:change", (_, markdown) => {
            callback(markdown);
        });
    },

    removeOnMarkdownChange: () => {
        ipcRenderer.removeAllListeners("markdown:change");
    },

    onOpenDirectory: (callback) => {
        ipcRenderer.on("directory:open", (_, {path, files}) => {
            callback(path, files);
        });
    },

    removeOnOpenDirectory: () => {
        ipcRenderer.removeAllListeners("directory:open");
    },

    /* Methods */
    save: (nodes) => {
        ipcRenderer.send("file:save", nodes);
    }
}

contextBridge.exposeInMainWorld("main", api);