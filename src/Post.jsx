import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
function Post() {
  const { id } = useParams();
  const [data, setData] = useState([])
  const url = import.meta.env.VITE_URL
  useEffect(() => {
    axios.get(`${url}/posts/${id}`).then((response) => {
      console.log("entered here")
      setData(response.data)
      console.log(data)
    }).catch(err => {
      console.log("this is the error:", err)
    })
  }, [id])
  if (!data) return <div>loading ....</div>
  return (
    <div className="md:my-15 my-10 flex gap-4 justify-between mx-6">
      <div className="border flex flex-col justify-between rounded-md w-170 h-150 max-h-full  max-w-full bg-white shadow-sm">
        <h1 className="bg-blue-500 pt-6 text-white text-center h-20">{data.title}</h1>
        <p className="text-justify text-center px-4 py-2 leading-relaxed">{data.postText}</p>
        <p className="bg-blue-500 text-white text-left h-20 pt-6">{data.username}</p>

      </div>
      <div className="max-w-full w-170 max-h-full p-6 justify-center flex-col gap-2  flex items-center">
        <h1>Comment Section</h1>
        <textarea type="text-area" className="border border-gray-500 rounded-md" />
      </div>

    </div>);
}

export default Post;
