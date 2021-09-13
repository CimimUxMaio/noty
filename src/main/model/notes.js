
export const NoteType = {
    TOPIC: "TOPIC",
    TEXT: "TEXT"
}


export class Note {
    static fromObject(object) {
        var prototype;
        switch(object.type) {
            case NoteType.TOPIC:
                prototype = Topic.prototype;
                break;
    
            default:
                prototype = Text.prototype;
        }
    
        object.children = object.children.map(c => this.fromObject(c));
        return Object.setPrototypeOf(object, prototype);
    }

    constructor(id, position, text) {
        this.id = id;
        this.position = position;
        this.text = text;

        this.children = [];
    }

    mainMarkdown(depth, asListElement = false) {
        const prefix = (depth > 0 && asListElement) ? " ".repeat(Math.max(0, depth -1) * 4) + "- " : "";
        return prefix + this.format(depth);
    }

    childrenMarkdown(depth) {
        if (this.children.length === 0) {
            return "";
        }

        if (this.children.length === 1) {
            return this.children[0].markdown(depth);
        }

        return this.children.map(c => c.markdown(depth, true)).join("");
    }

    markdown(depth = 0, asListElement = false) {
        return this.mainMarkdown(depth, asListElement) + "\n\r" + this.childrenMarkdown(depth + 1);
    }

    addChildren(...children) {
        this.children.push(...children);
    }
}

export class Topic extends Note {
    type = NoteType.TOPIC;
    
    format(depth) {
        return "#".repeat(depth+1) + " " + this.text;
    }
}

export class Text extends Note {
    type = NoteType.TEXT;

    format(depth) {
        return this.text;
    }
}