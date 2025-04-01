import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {MapComponent} from './Map'
import {Annotorious} from "@annotorious/react"
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Annotorious>
        <Container className='p-3'>
            <h1>Test App</h1>
            <MapComponent/>
        </Container>
    </Annotorious>
  )
}

export default App
