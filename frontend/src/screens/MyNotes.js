import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Accordion, Card } from 'react-bootstrap'
import FlipMotion from "react-flip-motion";
import { setUserDetails } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading';
const MyNotes = ({ search }) => {
    const [notesList, setNotesList] = useState([])
    const history = useHistory();
    const data = JSON.parse(localStorage.getItem("userInfo"));
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem("userInfo"))
        if (usersData) {
            console.log(usersData);
        } else {
            history.push("/");
        }
    }, [])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {
            fetch(`http://localhost:8000/api/notes/${id}`, {
                method: "delete",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
                .then(note => {
                    console.log(note);
                    history.push("/createnote")
                }).catch(err => console.log(err))
        }
    }


    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:8000/api/notes", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(note => {
                setNotesList(note);
                setLoading(false)
            }).catch(err => console.log(err))
    }, [], [deleteHandler])



    return (
        <div>
            <div className="container-lg">
                <h1 className="display-6 p-2 my-4">Welcome Back {!data ? "Jhon" : data.name} </h1>
                <Link to="/createnote">
                    <button className="btn btn-primary mx-4">Create New Note</button>
                </Link>

                <div className="cards m-4">
                    {loading && <ReactLoading className="m-auto" type="bars" color="#fff" height='120px' width='120px' />}
                    <FlipMotion>

                        {
                            notesList.map((note) => {
                                return (
                                    <Accordion key={note._id}>

                                        <Card className="mb-4">

                                            <Card.Header style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                cursor: "pointer"
                                            }} className="bg-primary text-white">
                                                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0" >{note.title}</Accordion.Toggle>
                                                <div className="button">
                                                    <div class="btn-group">

                                                        <Link to={`/note/${note._id}`} class="myBtn btn btn-primary md-p-0 bg-warning text-white">Edit</Link>
                                                        <a class="myBtn btn btn-primary md-p-0 bg-danger text-white" onClick={() => deleteHandler(note._id)}>Delete</a>
                                                    </div>
                                                </div></Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>
                                                            <h6>
                                                                <span class="badge bg-success">{note.category}</span>
                                                            </h6>
                                                            {note.content}
                                                        </p>
                                                        <footer className="blockquote-footer my-2">
                                                            Created on  <cite title="Source Title">{note.timestamps}</cite>
                                                        </footer>
                                                    </blockquote>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                    </Accordion>
                                )
                            }).reverse()
                        }

                    </FlipMotion>
                </div>
            </div>

        </div>
    )
}

export default MyNotes




// filter(filteredNote => {
//     filteredNote.title.toLowerCase().includes(search.toLowerCase());
// })
