import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([])
    const url = import.meta.env.VITE_URL
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${url}/posts`)
            .then((response) => {
                setPosts(response.data)
                console.log(response.data)


            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleClick = (post) => { navigate(`/post/${post.id}`) }
    return (
        <div>
            Welcom to Blogger Book
            <div className="flex gap-4 flex-col justify-center items-center  my-6" >
                {
                    posts.map((post, index) => (
                        <div key={index} onClick={() => handleClick(post)} className="border cursor-pointer flex flex-col justify-between rounded-md w-100 h-100 max-h-full  max-w-full bg-white shadow-sm">
                            <h1 className="bg-blue-500 py-2 text-white text-center h-10">{post.title}</h1>
                            <p className="text-justify text-center px-4 py-2 leading-relaxed">
                                {post.postText}
                            </p>

                            <p className="bg-blue-500 text-white text-left h-10 py-2">{post.username}</p>
                        </div>

                    ))
                }
            </div>

        </div>
    )
}