import {Link} from "react-router-dom";
import "./Card.scss"
const Card = ({post}) => {
    return (<>
        <div className="card col-4">
            <div className="head">
                <img src={"http://localhost:8080/story/file/" + post.image} alt="" />
            </div>
            <div className="body">
                <div className="row">
                <div className='tags'>
                    <span className='tag'>example1</span>
                    <span className='tag'>example2</span>
                    <span className='tag'>tag1</span>
                </div>
                <div className='like'>
                    <i class='bx bx-heart'></i>
                </div>
                </div>
                <div className='title'>{post.title}</div>
                <div className='desc'>{post.body.split(" ").slice(0, 15).join(" ")}</div>
                <div className="read-more">
                    <button><Link to={`story/${post.slug}`}>Read more</Link></button>
                </div>
            </div>
        </div>
    </>)
}
export default Card;