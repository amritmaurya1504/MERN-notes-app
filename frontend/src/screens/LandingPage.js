import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const LandingPage = () => {

    const history = useHistory();

    const userInfo = useSelector(state => state.user);

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem("userInfo"))
        if (usersData) {
            history.push("/mynotes")
        } else {
            history.push("/");
        }
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <div className="intro-text text-center my-5">
                        <h1 className="display-3 mt-5 mb-5">Welcome to Notes App</h1>
                        <p className="h6 lead">One safe place for all your notes.</p>

                    </div>
                    <div className="btns text-center">
                        <Link to="/login"><button className="btn btn-danger bg-danger text-white  me-3">Login</button></Link>
                        <Link to="/register"><button className="btn btn-outline-success text-white ">Register</button></Link>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
