import {useState, useEffect} from 'react';
import { Card } from '../../components';
import axios from 'axios';
import "./Likes.scss"
const Likes = ()=>{
    const [likedPosts, setLikedPosts] = useState(null);
    useEffect(()=>{
        fetchPost()
    },[])
    const fetchPost = async ()=>{
        const {data} = await axios.get("/like");
        setLikedPosts(data)
    }

    const handleLike = async (event)=>{
        try{
        const id = event.target.getAttribute('data-key')
        await axios.delete("/like",{data: {_id:id}});
        await fetchPost()
        }catch(err){
            console.log(err)
        }
    }
    return (<>
        <div className="likePage">
            <div className="row">
            <div className="col-8">
                <div className="row">
                {likedPosts && likedPosts.map((post)=>(<Card handleLike={handleLike} key={post._id} post={post}/>))}
                </div>
            </div>
            </div>
        </div>
    </>)
}
export default Likes;