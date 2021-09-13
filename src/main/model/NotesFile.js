import fs from "fs";
import { Note } from "./notes";
import ModelError from "./ModelError";


class FileSaveError extends ModelError {
    constructor(filePath) {
        super(
            `Unable to save file.\nPlease check that the given directory path is correct and exists.\nGiven path ${filePath}`
        );
    }

}


export default class NotesFile {
    static fromObject(object) {
        object.notes = object.notes.map(n => Note.fromObject(n));
        return Object.setPrototypeOf(object, this.prototype);
    }

    constructor(filePath, notes = []) {
        this.filePath = filePath;
        this.notes = notes;
    }

    markdown() {
        return this.notes.map(n => n.markdown()).join("\n");
    }

    update(notes) {
       this.notes = notes;
    }

    save() {
        fs.appendFile(this.filePath, JSON.stringify(this.notes), (err) => {
            if(err)
                throw new FileSaveError(this.filePath);
        });
    }
}