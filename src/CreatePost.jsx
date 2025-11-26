import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
const CreatePost = () => {
    const { loading, setLoading } = useState(false)
    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Title is required"),
        postMessage: Yup.string()
            .required("Post message is required"),
        username: Yup.string()
            .required("Name is required")
    })
    const handleSubmit = () => {
        setLoading(true)
    }
    if (loading) {
        return (
            <div>loading....</div>
        )
    }
    return (
        <div>
            <Formik
                initialValues={{
                    title: "",
                    postMessage: "",
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
                                <Field name='postMessage' type="text" className="rounded-md border w-full p-2 md:w-100 " id="l2" /> <br />
                                <ErrorMessage name='postMessage' component='div' className='text-red-500' />
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
