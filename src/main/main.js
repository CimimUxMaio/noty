import { app, BrowserWindow, Menu, dialog } from "electron";
import fs from "fs";
import path from "path";
import "./listeners";
import isDev from "electron-is-dev";
import ModelError from "./model/ModelError";


let mainWindow = null;

function createWindows() {
    mainWindow = new BrowserWindow({
        width: 900, height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.bundle.js"), 
        },
        show: false
    });

    mainWindow.loadFile(__dirname + "/index.html");
    mainWindow.on("ready-to-show", () => mainWindow.show());

    if(isDev)
        mainWindow.openDevTools({mode: "detach"});
}

app.on("ready", createWindows);

process.on("uncaughtException", (error) => {
    if(!(error instanceof ModelError))
        throw error;
    
    const options = {
        type: "error",
        title: "Error in main process",
        message: error.message
    };

    dialog.showMessageBoxSync(mainWindow, options);
});


const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Open file...",
                click: onOpenFile
            },
            {
                label: "Open folder...",
                click: onOpenDirectory
            },
        ]
    }
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);


const fileExtension = "notes";

function onOpenFile() {
    const options = {
        title : "Select file", 
        defaultPath: ".",
        buttonLabel : "Select",
        properties: ['openFile'],
        filters: [
            { name: "Notes", extensions: [fileExtension]}
        ]
    }

    dialog.showOpenDialog(mainWindow, options).then(response => {
       openDialogCallback(response);
    });
}

function onOpenDirectory() {
    const options = {
        title : "Select directory", 
        defaultPath: ".",
        buttonLabel : "Select",
        properties: ['openDirectory']
    }

    dialog.showOpenDialog(mainWindow, options).then(response => {
       openDialogCallback(response);
    });
}

function openDialogCallback({canceled, filePaths}) {
    if(!canceled){
        const selectedPath = filePaths[0];
        const pathStats = fs.statSync(selectedPath);

        var dirPath = (pathStats.isFile()) ? path.dirname(selectedPath) : selectedPath;
        sendOpenDirectoryEvent(dirPath);

        if(pathStats.isFile()) {
            sendLoadFileEvent(selectedPath);
        }
    }
}


function sendOpenDirectoryEvent(directoryPath) {
    fs.readdir(directoryPath, (_err, files) => {
        const data = {
            path: directoryPath,
            files: files.filter(f => path.extname(f) === ".".concat(fileExtension))
        };

        mainWindow.webContents.send("directory:open", data);
    });
}


function sendLoadFileEvent(filePath) {

} 