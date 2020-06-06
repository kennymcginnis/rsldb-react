import React from 'react'
import { Link } from 'react-router-dom'
// MUI
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
// Icons
import HomeIcon from '@material-ui/icons/Home'
// Components
import MyButton from 'components/TooltipIconButton'
// State
import useAuth from 'state/auth'

const Navbar = () => {
  const auth = useAuth()
  const { authenticated } = auth.state
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <Link to="/">
              <MyButton tip="Champions">
                <HomeIcon />
              </MyButton>
            </Link>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/champions">
              Index
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
