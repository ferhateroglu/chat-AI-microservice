import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewStory.scss";
import validator from 'validator';

const Admin = () => {
    const [inputs, setInputs] = useState(
        {
            title: "",
            body: ""
        }
    );
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputs.title < 6) {
                setErr("Title must be at least 6 characters long");
                return;
            }
            if (inputs.text < 50) {
                setErr("Text must be at least 50 characters long");
                return;
            }


            // upload img
            const imgName = await uploadFile("story-img")

            //upload sound
            const soundName = await uploadFile("story-sound")
            
            //upload new story
            const data = {
                title: inputs.title,
                body: inputs.body,
                fileKey: soundName,
                image: imgName
            }
            await axios.post("/story",data)

        } catch (error) {
            //setErr(error);
            console.log(error)
        }
    };
    const uploadFile = async (id) => {
        try {
            const element = document.getElementById(id);
            const file = element.files[0]

            var formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.post('/story/audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
                }
            })
            console.log(data);
            return data.key;
        } catch (err) {
            throw err
        }
    }

    return (
        <div className="new-story">
            <div className="header">
                <h1>Admin</h1>
            </div>
            <form>
                <div className="title">
                    <label htmlFor="title">Title</label>
                    <div className="sec-2">
                        <input
                            required
                            type="text"
                            placeholder="title"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="body">
                    <label htmlFor="textarea">Body</label>
                    <div className="sec-2">
                        <textarea
                            rows="4"
                            cols="50"
                            required
                            type="textarea"
                            placeholder="body"
                            name="body"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="image">
                    <label htmlFor="image"></label>
                    <div className="sec-2">
                        <input
                            id='story-img'
                            required
                            title="choose an image file"
                            type="file"
                            name="file"
                        />
                    </div>
                </div>


                <div className="sound">
                    <label htmlFor="audio"></label>
                    <div className="sec-2">

                        <input
                            id='story-sound'
                            required
                            title="choose a sound file"
                            type="file"
                            name="sound"
                        // hidden
                        />
                    </div>
                </div>
                <button className="admin-panel" onClick={handleSubmit}>Add</button>
                {err && <p>{err}</p>}

            </form>
        </div>
    );
}

export default Admin;