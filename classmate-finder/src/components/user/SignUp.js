import React from 'react'
import './SignUp.css'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  let navigate = useNavigate()
  const initValue = {
    username: "",
    password: "",
  }

  const validSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/users", data).then(() => {
      console.log(data);
      navigate("/login", {replace: true});
    })
  }

  return (
    <div >
      
      <Formik
        initialValues={initValue}
        onSubmit={onSubmit}
        validationSchema={validSchema}
      >
        
        <Form className="formContainer">
        <h1>Sign Up</h1>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete = "off"
            id="inputCreatePost"
            name ="username"
            placeholder = "(Ex. Chris123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete = "off"
            type = "password"
            id="inputCreatePost"
            name ="password"
            placeholder = "Password..."
          />

          <button type="submit"> Register </button>

        </Form>

      </Formik>
    </div>
  )
}

export default SignUp
