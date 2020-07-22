import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Form } from 'semantic-ui-react'

import { AuthContext } from '../context/authContext'

import { useForm } from '../hooks'

import { REGISTER_USER } from '../utils/graphql'

const initValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = (props) => {
  const context = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(
    registerUserHandler,
    initValues
  )
  const [errors, setErrors] = useState({})

  const [registerUser, newUser] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function registerUserHandler() {
    registerUser()
  }

  return (
    <div>
      <h1>Register</h1>
      <Form
        onSubmit={onSubmit}
        noValidate
        className={newUser.loading ? 'loading' : ''}
      >
        <Form.Input
          label="Username"
          placeholder="Username ..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          error={errors.username}
        />
        <Form.Input
          label="Email"
          placeholder="Email ..."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
        />
        <Form.Input
          label="Pasword"
          placeholder="Pasword ..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password ..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Register
