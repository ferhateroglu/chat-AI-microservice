import React from "react";
import { useEffect,useState,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.scss"
import { AuthContext } from "../../context/authContext";

import {Card, Slider, InfoCard} from "../../components"



const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const getPosts = async ()=>{
    const {data} = await axios({
      method: "GET",
      url: "/story",
      validateStatus: (status) => {
        return status < 500;
      },
    });
    console.log(data);
    setPosts(data)
  }

  const handleLike = async (event)=>{
    try{
    const storyId = event.target.getAttribute('data-key')
    axios.post("/like",{storyId});
    }catch(err){
        console.log(err)
    }
}
  

  useEffect(()=>{
    getPosts()
  },[])

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search


  return (<>

    <div className="home">
      <div className="row">
        <div className="main-content col-8">
          <div className="row">
            {posts && posts.map((post)=>(<Card key={post._id} handleLike={handleLike} post={post}/>))}
          </div>
        </div>
        <div className="right-content col-4">
          <div className="row">
          <Slider/>
          <InfoCard/>
          <InfoCard/>
          <InfoCard/>
          <InfoCard/>


          </div>
        </div>
      </div>
      <div className="row">
        <div className="pagiantion col-8">
          <div>1-2-3-4-5-6</div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
