import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
function Post() {
  const { id } = useParams();
  const [data, setData] = useState(null)
  const url = import.meta.env.VITE_URL
  const [postComments, setPostComments] = useState([])
  useEffect(() => {
    axios.get(`${url}/posts/${id}`).then((response) => {
      console.log("entered here")
      setData(response.data)
    }).catch(err => {
      console.log("this is the error:", err)
    })
    //fetch comments related to post
    axios.get(`${url}/comments/${id}`).then((response) => {
      console.log("Comments fetched:", response.data)
      setPostComments(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [id, url])
  const [comment, setComment] = useState({
    commentBody: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const handleChange = (e) => {
    const val = e.target.value
    const name = e.target.name
    setComment({
      ...comment,
      [name]: val
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.commentBody || submitting) return
    setSubmitting(true)
    axios.post(`${url}/comments`, { commentBody: comment.commentBody, PostId: id })
      .then((response) => {
        console.log("Post created successfully:", response.data);
        const newComment = response?.data?.data ?? response?.data
        setPostComments((prev) => [...prev, newComment]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setComment({ commentBody: "" })
        setSubmitting(false)
      })
  };

  if (!data) return <div>loading ....</div>
  return (
    <div className="md:my-15 my-10 flex gap-4 justify-between mx-6">
      <div>

        <div className="border flex flex-col justify-between rounded-md w-170 h-150 max-h-full  max-w-full bg-white shadow-sm">
          <h1 className="bg-blue-500 pt-6 text-white text-center h-20">{data.title}</h1>
          <p className="text-justify text-center px-4 py-2 leading-relaxed">{data.postText}</p>
          <p className="bg-blue-500 text-white text-left h-20 pt-6">{data.username}</p>

        </div>
        <div className="">
          <h1 className="bg-gray-200 text-center">Comment Section</h1>
          {postComments.map((c, index) => (
            <p key={index}>comment {index + 1}: {c.commentBody} </p>
          ))
          }
        </div>
      </div>
      <form onSubmit={handleSubmit} className="max-w-full w-170 max-h-full p-6 justify-center flex items-center">
        <input name="commentBody" placeholder="Comment...." onChange={handleChange} type="text-area" value={comment.commentBody} className="border p-2 border-gray-500 rounded-md" />
        <button type="submit" className="rounded-md p-2 w-fit bg-gray-500 border">Add Comment</button>
      </form>

    </div>);
}

export default Post;
