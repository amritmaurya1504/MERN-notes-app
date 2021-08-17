import React from 'react'
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import { Form } from "react-bootstrap"
const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [picture, setPicture] = useState(
        []
    )
    const [picUrl, setPicUrl] = useState()
    const history = useHistory()

    const registerHandler = (e) => {
        e.preventDefault();

        //picture posting
        const data = new FormData()
        data.append("file", picture)
        data.append("upload_preset", "NoteZipper");
        data.append("cloud_name", "amritrajmaurya")
        fetch("	https://api.cloudinary.com/v1_1/amritrajmaurya/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setPicUrl(data.url)
            })
            .catch(err => console.log(err))

        fetch("http://localhost:8000/api/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, picUrl
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert(data.message)
                    setName("")
                    setEmail("")
                    setPassword("")
                    setPicture("")
                    history.push("/login")
                }
            }).catch(err => {
                console.log(err);
            })
    }

    const postDetails = (picture) => {
        if (picture.type === "image/jpeg" || picture.type === "image/png") {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "NoteZipper");
            data.append("cloud_name", "amritrajmaurya");
            fetch("https://api.cloudinary.com/v1_1/amritrajmaurya/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url);
                    setPicUrl(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("Please select an image!")
        }
    };

    return (
        <div>
            <div className="container-lg">
                <h1 className="display-6 p-2 my-4">Register</h1>
                <div className="registerDiv">
                    <form method="post">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control mb-2" id="exampleInputName" aria-describedby="nameHelp" autocomplete="off" />
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autocomplete="off" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <Form.Group controlId="pic">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.File
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    id="custom-file"
                                    type="image/png"
                                    custom
                                />
                            </Form.Group>
                            {/* <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile02" />
                                <label class="input-group-text bg-info text-white" for="inputGroupFile02">Upload</label>
                            </div> */}
                        </div>
                        <div className="text mt-2 mb-4">
                            <p className="h6">Alreay have an account <Link to="/login">SignIn</Link> </p>
                        </div>
                        <button type="submit" class="btn btn-primary bg-warning text-black" onClick={registerHandler}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
