import React from "react";
import { useEffect,useState,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.scss"
import { AuthContext } from "../../context/authContext";



const Home = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(()=>{
    console.log(currentUser)
  },[])

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search


  return (<>

    <div className="home">
      <div className="row">
        <div className="main-content col-8">
          <div className="row">
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
              <div className='tags'>
                  <span className='tag'>example1</span>
                  <span className='tag'>example2</span>
                  <span className='tag'>tag1</span>
                </div>
                <div className='title'>Lorem ipsum Dolor</div>
                <div className='desc'>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className="read-more">
                  <button>Read More</button>
                </div>
              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>
                <div className="read-more">
                  <button>Read More</button>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
            <div className="card col-4">
              <div className="head">
                <img src="1.jpg" alt="" />
              </div>
              <div className="body">
                <div className='title'>ornek bir story</div>
                <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
                <div className='tags'>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                  <span className='tag'>tag1</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="right-content col-4">
          <div className="row">
          <div className="card col-12">
            <div className="head">
              <img src="2.jpg" alt="" />
            </div>
            <div className="body">
              <div className='title'>ornek bir story</div>
              <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
              <div className="read-more">
                  <button>Read More</button>
                </div>
            </div>
          </div>
          <div className="card col-6">
            <div className="body">
              <div className='title'>ornek bir story</div>
              <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
              <div className='tags'>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
              </div>
            </div>
          </div>
          <div className="card col-6">
            <div className="body">
              <div className='title'>ornek bir story</div>
              <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
              <div className='tags'>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
              </div>
            </div>
          </div>
          <div className="card col-6">
            <div className="body">
              <div className='title'>ornek bir story</div>
              <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
              <div className='tags'>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
              </div>
            </div>
          </div>
          <div className="card col-6">
            <div className="body">
              <div className='title'>ornek bir story</div>
              <div className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ut.</div>
              <div className='tags'>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
                <span className='tag'>tag1</span>
              </div>
            </div>
          </div>

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
