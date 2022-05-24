import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  return(
    <div className="row">
      <div className="col text-start">
        {props.index}
      </div>
      <div className="col text-center">
        <h4>{props.user.username}</h4>
      </div>
      <div className="col text-end">
        <i>{props.user.score}</i>
      </div>
    </div>
  )
}


const Leaderboard = () => {
  const [userList, setUserList] = useState([])
  let userLength = 1;

  useEffect(() => {
    const url = "http://localhost:5000/api/users"
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not fetch user data.")
        }
        return res.json()
      })
      .then(res => {
        setUserList(res.data.users)
      })
      .then(() => console.log("Ok"))
      .catch(err => console.log(err))
  }, [])

  return(
    <div className="d-flex align-items-center flex-column">
      <div className="mt-5 ms-2">
        <h1 className='creepy-text'>LEADERBOARD</h1> 
        <h1 className='creepy-text'>LEADERBOARD</h1> 
        <h1 className='creepy-text'>LEADERBOARD</h1> 
      </div>
      <div className="mt-3 pt-2 container-sm">
        { userList.map((user, i) => {
          return (
            <Profile key={i} user={user} index={userLength++}/>
          )
        })}
      </div>
      <div className="align-items-end">
        <Link to="/"><button className="btn-home">Back to Home</button></Link>
      </div>
    </div>
  )
}

export default Leaderboard