import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';


const CreateNotes = () => {
    const history = useHistory()
    const [title , setTitle] = useState();
    const [content , setContent] = useState();
    const [category , setCategory] = useState();

    const data = JSON.parse(localStorage.getItem("userInfo"));

    const createNote = (e) => {
        e.preventDefault();

        fetch("http://localhost:8000/api/notes/create", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title, content, category
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data)
                    history.push("/mynotes")
                }
            }).catch(err => {
                console.log(err);
            })

    }

    return (
        <div className="container-lg">
            <h1 className="display-6 p-2 my-4">Welcome Back {data.name} </h1>
            <div className="card m-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        Create Note
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Content</label>
                                <div class="form-floating">
                                    <textarea class="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "120px"}}></textarea>
                                    <label for="floatingTextarea2">Content</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Category</label>
                                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" class="btn btn-primary bg-success text-white" onClick={createNote}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNotes
