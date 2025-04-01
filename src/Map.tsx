import {
    AnnotoriousOpenSeadragonAnnotator,
    OpenSeadragonAnnotator,
    OpenSeadragonViewer,
    useAnnotator
} from '@annotorious/react';

import '@annotorious/react/annotorious-react.css';
import {Options} from "openseadragon";
import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";


// The function is (i.e. returns a) component. The component is just a div,
// but when it's added to the DOM an "effect hook" runs that loads up OpenSeadragon
// and sets it to view the div we returned.

export const MapComponent = () => {
    const source = {
        type: "image",
        url: "src/assets/perseverance.jpg"
    }
    const [tool, setTool] = useState<'rectangle' | 'polygon' | undefined>();

    const options: Options = {
        "id": "seadragon-viewer",
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        zoomPerClick: 1,    // this will make sure we don't zoom in automatically on click
        "tileSources": source
    }

    const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();

    // this does the initial setup when the annotator is mounted.
    useEffect(() => {
        // anno might be null because the component is not mounted yet.
        // This function will run again when the component mounts
        if (!anno) {
            return;
        }
        anno.on('createAnnotation', () => {setTool(undefined)})

        // we can set the initial annotations here.
        const annots = localStorage.getItem('annotations');
        if (annots) {
            anno.setAnnotations(JSON.parse(annots));
        }

        // anno.setAnnotations(
        //     [createTestAnno(100, 100, 20, 20, "foo")]
        // )
    }, [anno]);

    // well, now that's an ugly syntax!
    function ToolButton({text, new_tool, tool_now}: { text: string,
        new_tool: 'rectangle' | 'polygon',
        tool_now: 'rectangle' | 'polygon' | undefined }) {
        return <Button
            className={new_tool === tool_now ? 'm-1 btn-primary' : 'm-1 btn-light'}
            onClick={() => {
                setTool(new_tool);
            }}>{text}</Button>
    }


    function FuncButton({text, func}: { text: string, func: () => void }) {
        return <Button className="m-1 btn-secondary"
            onClick={func}>{text}</Button>
    }

    function deleteSelected() {
        // delete the current annotation
        const selected = anno.getSelected()
        if (selected) {
            selected.forEach(id => anno.removeAnnotation(id))
        }
    }


    // and now we return the actual DOM elements that will be mounted.
    return (
        <Container>
            <Row>
                <Col>
                    <p>Use the mouse wheel to zoom in and out. To create an annotation, click <b>Rectangle</b> or <b>Poly</b> and then click
                        in the image to draw (don't drag!).</p>
                    <p>Other buttons let you <b>Delete</b> selected annotations, <b>Clear</b> all annotations, or <b>Save</b> (to local storage, no DB yet!)</p>
                </Col>
            </Row>
            <Row>
                <Col md="auto">
                    <OpenSeadragonAnnotator drawingEnabled={tool != undefined} tool={tool || 'rectangle'}>
                        <OpenSeadragonViewer className="osd-container" options={options}/>
                    </OpenSeadragonAnnotator>
                </Col>
                <Col xs lg="2">
                    <Row>
                        <ToolButton text="Rectangle" new_tool="rectangle" tool_now={tool}/>
                        <ToolButton text="Polygon" new_tool="polygon" tool_now={tool}/>
                    </Row>
                    <Row className="mt-5">
                        <FuncButton text="Delete selected" func={() => {
                            deleteSelected();
                        }}/>
                        <FuncButton text="Clear all" func={() => {
                            // clear annotations with confirmation
                            if (confirm('Are you sure you want to clear all annotations?')) {
                                anno.clearAnnotations();
                            }
                        }}/>
                        <FuncButton text="Save" func={() => {
                            // save annotations
                            const annots = anno.getAnnotations();
                            localStorage.setItem('annotations', JSON.stringify(annots));
                        }}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}