import {useContext} from 'react';
import {AuthContext} from "../../context/authContext"
import "./TopBar.scss";
const TopBar = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className='top-bar'>
      <div className='search'>
        <i className='bx bx-search icon'></i>
        <input className='input-field' type="text" />
      </div>
      <div className="profile">

        <img src={"http://localhost:8080/story/file/1672428890482-profile.jpeg"} alt="" />
        <span>Jane</span>
        <i className='bx bx-world'></i>
        <i className='bx bx-sun icon sun'></i>
      </div>
    </div>
  )
}

export default TopBar;