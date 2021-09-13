import { ipcMain } from "electron";
import { Note } from "./model/notes";
import NotesFile from "./model/NotesFile";


let currentFile = new NotesFile(__dirname + "/pruebas/default.notes");

ipcMain.on("file:save", (event, data) => {
    const previousMarkdown = (currentFile) ? currentFile.markdown() : "";
    const notes = data.map(n => Note.fromObject(n));
    currentFile.update(notes);
    const currentMarkdown = currentFile.markdown();

    if (previousMarkdown !== currentMarkdown) {
        event.sender.send("markdown:change", currentMarkdown);
        currentFile.save();
    }
});