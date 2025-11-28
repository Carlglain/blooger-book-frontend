import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
    const navigate = useNavigate()
    const url = import.meta.env.VITE_URL
    const [loading, setLoading] = useState(false)
    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Title is required"),
        postText: Yup.string()
            .required("Post message is required"),
        username: Yup.string()
            .required("Name is required")
    })
    const handleSubmit = (data) => {
        setLoading(true)
        axios.post(`${url}/posts/create`, data).then((response) => {
            console.log("Post created successfully: ", response)
            navigate('/')

        }).catch(err => {
            console.log(err)
        }).finally(() =>
            setLoading(false)

        )
    }
    if (loading) {
        return (
            <div>loading....</div>
        )
    }
    return (
        <div className='mt-25'>
            <Formik
                initialValues={{
                    title: "",
                    postText: "",
                    username: ""
                }}
                validationSchema={validationSchema}
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, dirty }) => {
                    return (
                        <Form onSubmit={handleSubmit} className='border rounded-md p-4 flex flex-col gap-2 md:gap-4 mx-auto my-10 w-fit'>
                            <div>
                                <label htmlFor="l1">Title:</label> <br />
                                <Field name='title' type="text" className="rounded-md p-2 border w-70 md:w-100 " id="l1" /> <br />
                                <ErrorMessage name='title' component='div' className='text-red-500' />
                            </div>
                            <div>
                                <label htmlFor="l2">Post:</label> <br />
                                <Field name='postText' type="text" className="rounded-md border w-full p-2 md:w-100 " id="l2" /> <br />
                                <ErrorMessage name='postText' component='div' className='text-red-500' />
                            </div>
                            <div>
                                <label htmlFor="l3">User Name:</label> <br />
                                <Field name='username' type="text" className="rounded-md p-2 border w-full md:w-100 " id="l3" /> <br />
                                <ErrorMessage name='username' component='div' className='text-red-500' />
                            </div>
                            <button type='submit' disabled={!dirty || !isValid || loading} className={`${!dirty || !isValid || loading ? "bg-gray-600" : "bg-blue-500"} text-white rounded-md p-2 w-50 self-center`}> Create Post</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default CreatePost
