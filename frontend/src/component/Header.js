import React, { useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from "../actions/index"
const Header = ({ setSearch }) => {
    // const [isLogin , setIsLogin] = useState(false);
    // const usersData = JSON.parse(localStorage.getItem("userInfo"))
    const userData = useSelector(state => state.user)

    const RenderMenu = () => {
        if (userData) {
            return (
                <div className="navDiv">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/mynotes">My Notes</Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link" to="/" onClick={() => {
                            dispatch(logout())
                            localStorage.removeItem("userInfo");
                            localStorage.removeItem("jwt");
                            history.push("/");
                        }}>Logout</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/profile">{userData.name}</Link>
                    </li>
                </div>
            )

        } else {
            return (
                <div className="navDiv">
                    <li class="nav-item">
                        <Link class="nav-link" to="/login">Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/register">Register</Link>
                    </li>
                </div>
            )

        }
    }
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div class="container-fluid mx-5">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            <RenderMenu />

                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
