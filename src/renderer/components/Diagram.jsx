import { useEffect, useState } from "react";
import ReactFlow, { addEdge, removeElements, useZoomPanHelper } from "react-flow-renderer";
import { noteFromType, updateNote, toFileModel } from "./utils/nodes"
import NodeCreationModal from "./NodeCreationModal";



const Diagram = () => {
    const [elements, setElements] = useState([]);
    const [mousePosition, setMousePosition] = useState({x: 0, x: 0});
    const [showNodeCreator, setShowNodeCreator] = useState(false);
    const { project } = useZoomPanHelper();

    useEffect(() => {
        window.main.save(toFileModel(elements));
    }, [elements]);

    const handleElementsRemove = (removed) => {
        setElements((els) => removeElements(removed, els));
    }

    const handleOnConnect = (params) => {
        setElements((els) => addEdge(params, els));
    }

    const handleNodeDragStop = (_, node) => {
        setElements(prev => updateNote(prev, node));
    }

    const nextId = () => {
        const ids = elements.map(el => el.id).filter(id => !isNaN(id));
        return Math.max(...ids, 0) + 1;
    }

    const createElement = (type, text) => {
        const newElement = noteFromType(`${nextId()}`, text, type, mousePosition);
        setElements(prev => prev.concat(newElement));
    }

    const handlePaneClick = (e) => {
        const boundingBox = e.target.getBoundingClientRect();

        const viewX = e.pageX - boundingBox.left;
        const viewY = e.pageY - boundingBox.top;
        const pos = project({ x: viewX, y: viewY });

        setMousePosition(pos);
        setShowNodeCreator(true); 
    }

    return (
        <>
            <NodeCreationModal 
                show={showNodeCreator}
                onHide={() => setShowNodeCreator(false)}
                createElement={createElement}
            />
            <div className="canvas">
                <ReactFlow 
                    elements={elements} 
                    onElementsRemove={handleElementsRemove}    
                    onConnect={handleOnConnect}
                    onNodeDragStop={handleNodeDragStop}
                    deleteKeyCode={46} // DEL
                    onPaneClick={handlePaneClick}
                />
            </div>
        </>
    );
}
 
export default Diagram;