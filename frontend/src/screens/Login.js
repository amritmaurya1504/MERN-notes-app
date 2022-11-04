import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { setUserDetails } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from 'react-fullscreen-loading';
const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);


    const loginHandler = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch("https://wenote-app-backend.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                    setLoading(false)
                } else {
                    setLoading(false)
                    alert(data.message)
                    const { _id , name , email , picUrl , timestamps } = data.userLogin
                    const { token } = data
                    
                    const userInfo = {
                       _id , name , email , picUrl , timestamps , token
                    }
                    dispatch(setUserDetails(userInfo))
                    localStorage.setItem("userInfo" , JSON.stringify(userInfo));
                    localStorage.setItem("jwt" , userInfo.token);
                }
            }).catch(err => {
                console.log(err);
            })

    }
    const history = useHistory()

    const userInfo = useSelector(state => state.user);

    useEffect(() => {
       if(userInfo){
           history.push("/mynotes");
       }
    },[history , userInfo])

    return (
        <div>
        {loading && <Loading loading background="#2ecc71" loaderColor="#3498db" />}
            <div className="container-lg">
                <h1 className="display-6 p-2 my-4">Login</h1>
                <div className="loginDiv">
                    <form method="post">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autocomplete="off" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="text mt-2 mb-2">
                            <p className="h6">Don't have an account <Link to="/register">Register</Link> </p>
                        </div>
                        <button type="submit" class="btn btn-primary bg-warning text-black" onClick={loginHandler}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
