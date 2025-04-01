import {
    AnnotoriousOpenSeadragonAnnotator,
    OpenSeadragonAnnotator,
    OpenSeadragonViewer,
    useAnnotator
} from '@annotorious/react';

import '@annotorious/react/annotorious-react.css';
import {Options} from "openseadragon";
import {useEffect, useState} from "react";

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


    // and now we return the actual DOM elements that will be mounted.
    return (
        <div>
            <OpenSeadragonAnnotator
                drawingEnabled={tool != undefined}

                tool={tool || 'rectangle'}
            >
                <OpenSeadragonViewer className="osd-container" options={options}/>
                <button onClick={() => {console.log(anno.getAnnotations())}}>
                    Display annotations on console
                </button>
            </OpenSeadragonAnnotator>
            <p>Click a button and then draw your annotation.</p>
            <div className='drawmodes'>
                <button
                    className={tool === 'rectangle' ? 'button-active' : ''}
                    onClick={() => {
                    setTool('rectangle');
                }}>Rectangle</button>
                <button
                    className={tool === 'polygon' ? 'button-active' : ''}
                    onClick={() => {
                    setTool('polygon');
                }}>Polygon</button>
            </div>

            { /* These are other buttons not related to drawing modes*/ }

            <div className='actions'>
                <button
                    onClick={() => {
                        // save annotations
                        const annots = anno.getAnnotations();
                        localStorage.setItem('annotations', JSON.stringify(annots));
                    }}>Save</button>
                <button
                    onClick={() => {
                        // clear annotations with confirmation
                        if (confirm('Are you sure you want to clear all annotations?')) {
                            anno.clearAnnotations();
                        }
                    }}>Clear</button>
            </div>
        </div>
    );
}