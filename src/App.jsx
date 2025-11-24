import { useEffect, useState } from "react";
import axios from 'axios'
export default function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get("http://localhost:2020/posts")
      .then((response) => {
        setPosts(response.data)
        console.log(response.data)


      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      Welcom to Blogger Book
      <div className="flex gap-4">
        {
          posts.map((post, index) => (
            <div key={index} className="border rounded-md px-4 py-2 max-w-full">
              <h1 style={{ color: "blue" }}>{post.title}</h1>
              <p>{post.postText}</p>
              <p>{post.username}</p>
            </div>

          ))
        }
      </div>

    </div>
  )
}