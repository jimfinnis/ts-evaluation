import OpenSeadragon, {Options} from "openseadragon"
import {ReactNode, useEffect} from "react";

export default function MapComponent (): ReactNode {
    // useEffect lets you declare things that happen when the component is added to the DOM.
    // It takes two args: the setup func itself (which is void) and dependencies, which are
    // "reactive values" (state) referenced inside the setup code.
    useEffect(() => {

        const source = {
            type: "image",
            url: "src/assets/perseverance.jpg"
        }

        const options: Options = {
            "id": "seadragon-viewer",
             prefixUrl: "//openseadragon.github.io/openseadragon/images/",
            "tileSources": source
        }

        const viewer = OpenSeadragon(options)

        // useEffect returns a cleanup function.
        return () => {
            viewer.destroy()
        }
    }, []);

    return (
        // you have to give the container a size or the viewer won't be visible!
        <div style={{ width:"800px",  height:"600px" }}
            id="seadragon-viewer" className="seadragon-viewer" />
    );
}