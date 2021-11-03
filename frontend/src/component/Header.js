import React, { useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from "../actions/index"
const Header = ({ setSearch }) => {
    // const [isLogin , setIsLogin] = useState(false);
    // const usersData = JSON.parse(localStorage.getItem("userInfo"))
    const userData = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
                <div class="container-fluid mx-2">
                    <a class="navbar-brand fw-bold" href="#">weNote</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav me-auto">
                            {userData && (<li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/mynotes">My Notes</Link>
                            </li>)}


                            {!userData && (<li class="nav-item">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>
                            )}
                            {!userData && (<li class="nav-item">
                                <Link class="nav-link" to="/register">Register</Link>
                            </li>)}
                            {
                                userData && (
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{userData && userData.name}</a>
                                        <div class="dropdown-menu">
                                            <Link class="dropdown-item  text-dark" to="/profile">Profile</Link>
                                            {/* <a class="dropdown-item" href="#">Another action</a>
                                            <a class="dropdown-item" href="#">Something else here</a> */}
                                            <div class="dropdown-divider"></div>
                                            {userData && (<li class="nav-item">
                                                <Link class="dropdown-item  text-dark" to="/" onClick={() => {
                                                    dispatch(logout())
                                                    localStorage.removeItem("userInfo");
                                                    localStorage.removeItem("jwt");
                                                    history.push("/");
                                                }}>Logout</Link>
                                            </li>)}
                                        </div>
                                    </li>
                                )
                            }

                        </ul>
                        <form class="d-flex" >
                            <input class="form-control me-sm-2" className="border border-light ps-3" type="text" placeholder="Search" />
                            <button class="btn btn-dark mx-2 my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
