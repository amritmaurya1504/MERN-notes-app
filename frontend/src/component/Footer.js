import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <div>
           <footer style={{
               width : "100%",
               position : "relative",
               bottom : "0",
               display : "flex",
               justifyContent : "center"
           }}>
             <Container>
                 <Row>
                     <Col className="text-center py-3 mt-5">Copyright &copy; Amrit Raj</Col>
                 </Row>
             </Container>
           </footer>
        </div>
    )
}

export default Footer
