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
    <div className="my-10">
      <div>
        {data.postText}
      </div>

    </div>);
}

export default Post;
