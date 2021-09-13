import { Tabs, Tab } from "react-bootstrap";
import Diagram from "./Diagram";
import Preview from "./Preview";

 
const Board = () => {
    return (
        <Tabs defaultActiveKey="diagram" className="mb-3">
            <Tab eventKey="diagram" title="Diagram">
                <Diagram />
            </Tab>
            <Tab eventKey="preview" title="Preview">
                <Preview />
            </Tab>
        </Tabs>
    );
}
 
export default Board;