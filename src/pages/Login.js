import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/authContext'

import { useForm } from '../hooks'

import { LOGIN_USER } from '../utils/graphql'

const initValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const context = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(loginUserHandler, initValues)
  const [errors, setErrors] = useState({})

  const [loginUser, newUser] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      proxy.reset()
      context.login(result.data.login)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  function loginUserHandler() {
    loginUser()
  }

  return (
    <div>
      <h1>Login</h1>
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
          label="Pasword"
          placeholder="Pasword ..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      <Message>
        <Message.Header>Register</Message.Header>
        <p>
          click <Link to="/register">here</Link> to register
        </p>
      </Message>

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

export default Login
