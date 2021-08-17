import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
const Profile = () => {

    const data = useSelector(state => state.user)
    const history = useHistory()

    useEffect(() => {
        if(!data){
            history.push("/login")
        }
    }, [])

    return (
        <div className="container-lg">
              <h1 className="display-6 p-2 my-4">Profile Page</h1>
              <div className="profileData bg-white p-4">
                  <div className="info">
                      <p className="h5">Name : <span className="ps-4 text-primary">{data.name}</span></p>
                      <p className="h5">Email : <span className="ps-4 text-primary">{data.email}</span></p>
                  </div>
                  <div className="image">
                      <img src={data.picUrl} className="img-fluid rounded-circle" alt="" />
                  </div>
              </div>
        </div>
    )
}

export default Profile
