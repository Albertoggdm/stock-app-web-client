import React, { useState, useContext } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/authContext'

function MenuBar() {
  const { pathname } = window.location
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const { user, logout } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState(path)
  const client = useApolloClient()

  const handleItemClick = (e, { name }) => setActiveItem(name)
  const handleLogout = () => {
    client.resetStore()
    logout()
  }

  return (
    <Menu pointing secondary size="large" color="orange">
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      {user && (
        <Menu.Item
          name="my-wallet"
          active={activeItem === 'my-wallet'}
          onClick={handleItemClick}
          as={Link}
          to="/my-wallet"
        />
      )}
      <Menu.Menu position="right">
        {user ? (
          <>
            <Menu.Item name={user.username} active />
            <Menu.Item
              active={activeItem === 'logout'}
              icon="power off"
              onClick={handleLogout}
              as={Link}
              to="/"
            />
          </>
        ) : (
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default MenuBar
