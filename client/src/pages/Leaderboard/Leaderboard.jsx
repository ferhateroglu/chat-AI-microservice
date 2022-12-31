import { useState, useEffect } from 'react';
import axios from "axios"
import "./Leaderboard.scss"
const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState();
  useEffect(() => {
    fetchTopUsers()
  }, [])

  const fetchTopUsers = async () => {
    try {
      const { data } = await axios.get("/leaderBoard");
      setTopUsers(data);
      console.log(topUsers)
    } catch (err) {
      throw err;
    }
  }

  return (<>
    {topUsers && <div className="leaderboard">
      <div className="head">
        <i className="fas fa-crown"></i>
        <h1>Top Readers</h1>
        <i className='bx bx-trophy'></i>
      </div>
      <div className="body">
        <ol>

          {topUsers.map((user) => (
            <li key={user._id}>
              <mark>{user.username}</mark>
              <small>{user.score}</small>
            </li>
          ))}

        </ol>
      </div>
    </div>}
  </>)
}
export default Leaderboard;