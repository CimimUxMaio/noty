function note(id, position, text, className) {
    return {
        id,
        position,
        data: { label: text },
        className
    };
}

export function noteFromType(id, text, type, position = { x: 400, y: 400}) {
    return note(id, position, text, type + "-note")
}

export function edge(source, target, sourceHandle = null, targetHandle = null) {
    return {
        source, 
        target,
        targetHandle,
        sourceHandle,
        id: `reactflow__edge-${source}${sourceHandle}-${target}${targetHandle}`
    }
}

export function updateNote(elements, node) {
    return elements.map(el => {
        if(el.id === node.id) {
            node.className = el.className;
            return node;
        }

        return el;
    });
}


function isEdge(el) {
    return el.id.startsWith("reactflow__edge")
}


export function fromFileModel(file) {
    var elements = [];
    for (var n in file) {
        elements.push(note(n.id, n.position, n.text, `${n.type.toLowerCase()}-note`));
        const edges = n.children.map(c => edge(n.id, c.id));
        elements.push(...edges);
        elements.push(...fromFileModel(n.children));
    }

    return elements;
}


function toNode(elements, el) {
    const edges = elements.filter(edge => isEdge(edge) && edge.source === el.id);
    const children = elements.filter(child => edges.map(edge => edge.target).includes(child.id)).map(child => toNode(elements, child));

    return {
        id: el.id,
        text: el.data.label,
        position: el.position,
        type: el.className.substr(0, el.className.length - 5).toUpperCase(),
        children
    }
}


export function toFileModel(elements) {
    const targets = elements.filter(edge => isEdge(edge)).map(edge => edge.target);
    const rootNodes = elements.filter(el => !isEdge(el) && !targets.includes(el.id));
    return rootNodes.map(root => toNode(elements, root));
}