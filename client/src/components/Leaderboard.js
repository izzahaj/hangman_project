import React from "react";

const sampleUsers = [
  {
    username: "Wen Kai",
    points: 80200
  },
  {
    username: "Lee Hao Rui",
    points: 23130
  },
  {
    username: "Bryan Toh",
    points: 35200
  },
  {
    username: "Nina Gan",
    points: 21030
  },
  { 
    username: "Benjamin", 
    points: 12540
  }, 
  { 
    username: "Sharifah", 
    points: 52590
  }, 
  { 
    username: "Shannon", 
    points: 42870
  }, 
  { 
    username: "Rachel Goh", 
    points: 78270,
  } 
]

const Profiles = ( {users} ) => {
  return (
    <div>{Item(sampleUsers)}</div>
  )
}

const Item = (data) => {
  return (
    <>
      {
        data.map((val, index) => (
          <div className='container-2' key={index}>
            <h2>
              {index + 1} - {val.username}
              <i><small>{val.points}</small></i>
            </h2>
          </div>
        ))
      }
    </>
  )
}

const sortUsers = (users) => { 
  // sort with asending order 
  return users.sort((a, b) => { 
    if (a.points === b.points) { 
      return b.points - a.points; 
    } else { 
      return b.points - a.points; 
    } 
  }) 
} 


const Leaderboard = () => {
  return(
    <div className="container-2 center">
      <div className="row creepy-text-container">
        <h1 className='creepy-text'>Leaderboard</h1> 
        <h1 className='creepy-text'>Leaderboard</h1> 
        <h1 className='creepy-text'>Leaderboard</h1> 
      </div>
      <Profiles sampleUsers={sortUsers(sampleUsers)}/>
    </div>
  )
}

export default Leaderboard