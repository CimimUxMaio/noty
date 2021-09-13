import { ListGroup, Offcanvas } from "react-bootstrap";

const CurrentPath = ({ dirPath }) => {
    if(!dirPath)
        return <>No folder selected</>;

    return (
        <Offcanvas.Title>
            {dirPath.slice(dirPath.lastIndexOf("/")+1)}
        </Offcanvas.Title>
    ); 
}
 
const FileExplorer = ({ show, onHide, dirPath, files }) => {
    return (
        <Offcanvas show={show} scroll backdrop={false} className="file-explorer">
            <Offcanvas.Header closeButton onHide={onHide}>
                <CurrentPath dirPath={dirPath} />
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {files?.map((f, i) => {
                        return <ListGroup.Item className="file-item" key={i} action>{f}</ListGroup.Item>;
                    })}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
 
export default FileExplorer;