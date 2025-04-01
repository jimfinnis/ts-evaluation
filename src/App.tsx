import './App.css'
import {MapComponent} from './Map'
import {Annotorious} from "@annotorious/react";

function App() {
  return (
    <Annotorious>
      <h1>Test App</h1>
        <MapComponent/>
    </Annotorious>
  )
}

export default App
