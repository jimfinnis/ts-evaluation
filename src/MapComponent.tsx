import React from 'react'
import {
    OpenSeadragon,
    Options
} from 'openseadragon'

const options: Options = {"tileSources": '/perseverance.jpg'}

class Map extends React.Component {
    render() {
        return OpenSeadragon(options)
    }
}