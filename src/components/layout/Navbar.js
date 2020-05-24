import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../TooltipIconButton'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import HomeIcon from '@material-ui/icons/Home'
import { useRecoilValue } from 'recoil'
import { authState } from '../../state/auth'

const Navbar = () => {
  const { authenticated } = useRecoilValue(authState)
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
