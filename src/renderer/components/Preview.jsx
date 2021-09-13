import { useEffect, useState, useRef } from "react";
import marked from "marked";
import parse from "html-react-parser";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";


const Preview = () => {
    const [markdown, setMarkdown] = useState(null);
    const previewRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => previewRef.current
    });

    useEffect(() => {
        window.main.onMarkdownChange((markdown) => {
            setMarkdown(markdown);
        });

        return window.main.removeOnMarkdownChange;
    }, [markdown]);

    if(markdown === null)
        return "Loading...";

    return (
        <>
            <Button onClick={handlePrint}>Print to PDF</Button>
            <div ref={previewRef} className="preview-page">{parse(marked(markdown))}</div>;
        </>
    );
}
 
export default Preview;