import { useState, useRef } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const NodeCreationModal = ({ createElement, onHide, ...props }) => {
    const defaultType = "text";
    const [text, setText] = useState("");
    const [type, setType] = useState(defaultType);

    const onSubmit = (e) => {
        e.preventDefault();

        if(text !== "")
            createElement(type, text);

        setType(defaultType);
        onHide();
    }

    return (
        <Modal 
            {...props}
            animation={false}  // Bug workaround. Animation should be false so that autofocus works
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>New node</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{padding: "3%"}} onSubmit={onSubmit}>
                    <Row style={{marginBottom: "3%"}}>
                        <Col>
                            <Form.Control 
                                autoFocus
                                type="text"
                                style={{height: "100%"}}
                                onChange={e => { setText(e.target.value) }} 
                            />
                        </Col>
                        <Col>
                            <Row>
                                <Form.Select
                                    defaultValue={defaultType} 
                                    onChange={e => { setType(e.target.value) }}
                                >
                                    <option value="topic">Topic</option>
                                    <option value="text">Text</option>
                                </Form.Select>
                            </Row>
                        </Col>
                    </Row>
                    <Button type="submit">Create!</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default NodeCreationModal;