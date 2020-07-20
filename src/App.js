import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import MyWallet from './pages/MyWallet.js'
import Company from './pages/Company.js'

import UnauthRoute from './components/UnauthRoute/UnauthRoute.js'
import MenuBar from './components/MenuBar/MenuBar.js'

import { AuthProvider } from './context/authContext'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <UnauthRoute exact path="/login" component={Login} />
          <UnauthRoute exact path="/register" component={Register} />
          <Route exact path="/my-wallet" component={MyWallet} />
          <Route exact path="/company/:companySymbol" component={Company} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App
