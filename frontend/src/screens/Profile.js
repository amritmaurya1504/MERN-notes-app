import React, { useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import { setUserDetails } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux'
const Profile = () => {

    const data = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        dispatch(setUserDetails(user));
        if (!data) {
            history.push("/login")
        }
    }, [])

    return (
        <div className="container-lg">
            <h1 className="display-6 p-2 my-4">Profile Page</h1>
            {/* <div className="profileData p-4">
                <div className="info">
                    <h1 className="display-6 fs-4 p-2">Name : <input className="text border border-dark p-2 text-secondary" placeholder={data && data.name} /></h1>
                    <h1 className="display-6 fs-4 p-2 ">Email :&nbsp; <input className="text p-2 text-secondary" placeholder={data && data.email} /></h1>
                </div>
                <div className="image">
                    <img src={data && data.picUrl} className="img-fluid rounded-circle" alt="" />
                </div>
            </div> */}
            <div class="card">
                <div class="card-header">
                    Profile Details
                </div>
                <div class="card-body">
                    <div className="info">
                        <div className="data">
                            <h5 class="card-title">{data && data.name}</h5>
                            <p class="card-text">{data && data.email}</p>
                            <Link to="/mynotes" class="btn btn-primary">My Notes</Link>
                        </div>
                        <div className="img">
                            <img src={data && data.picUrl} className="img-fluid rounded-circle" alt="" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile
