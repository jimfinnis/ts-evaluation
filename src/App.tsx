import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {MapComponent} from './Map'
import {Annotorious} from "@annotorious/react"
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Annotorious>
        <Container className='p-3'>
            <h1>Test Annotator App</h1>
            <MapComponent/>
        </Container>
    </Annotorious>
  )
}

export default App
