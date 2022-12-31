import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Story.scss"
const Story = () => {
    const {slug} = useParams()
    const player = useRef(null);
    /*const [isPlaying, setIsPlaying] = useState(false)
    let player = useRef(null);

    useEffect(()=>{
        const audioTag = document.querySelector('#music')
        player.current = audioTag
    },[])

    
    const handlePlayer = ()=>{
        isPlaying ? player.current.pause() : player.current.play();
        setIsPlaying(!isPlaying)
    }*/
    const [story, setStory] = useState(null)
    useEffect(()=>{
        fetchDatas()
    },[])

    const fetchDatas = async () =>{
        const {data} = await axios.get(`/story/${slug}`)
        setStory(data)
        const audioTag = document.querySelector('#music')
        player.current = audioTag
    }

    return (<>
        {story && <div className="story">
            <div className="row">
                <div className="col-8">
                    <div className="main">
                        <img src={"http://localhost:8080/story/file/"+story.image} alt="" />
                        <div className="content">
                            <div className="player">
                                <audio id='music' controls>
                                    <source src={"http://localhost:8080/story/file/"+ story.fileKey} type="audio/ogg" />
                                </audio>
                            </div>
                            <div className="head">
                                <h1>{story.title}</h1>
                            </div>
                            <div className="body">
                                <p>{story.body}</p>
                            </div>

                        </div>
                        <div className="ghost">
                            <div className="player">
                                <audio id='music' controls>
                                    <source src="" type="audio/ogg" />
                                </audio>
                            </div>
                            <div className="head">
                                <h1>{story.title}</h1>
                            </div>
                            <div className="body">
                                <p>{story.body}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>)
}
export default Story;