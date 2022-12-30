import "./TopBar.scss";
const TopBar = () => {
  return (
    <div className='top-bar'>
      <div className='search'>
        <i className='bx bx-search icon'></i>
        <input className='input-field' type="text" />
      </div>
      <div className="profile">

        <img src="profile.jpeg" alt="" />
        <span>Jane</span>
        <i className='bx bx-world'></i>
        <i className='bx bx-sun icon sun'></i>
      </div>
    </div>
  )
}

export default TopBar;