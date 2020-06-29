import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// MUI
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
// Components
import Typography from 'components/Typography'
// Icons
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { RiAccountCircleLine, RiUserAddLine } from 'react-icons/ri'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import MailIcon from '@material-ui/icons/Mail'
import MoreIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchIcon from '@material-ui/icons/Search'
// State
import { useRecoilValue } from 'recoil'
import { authState } from 'state/atoms'
import useAuth from 'state/auth'
import { titleState } from 'state/atoms'
import Hidden from '@material-ui/core/Hidden'

const Navbar = () => {
  const classes = useStyles()

  const title = useRecoilValue(titleState)
  const auth = useAuth()
  const { authenticated } = useRecoilValue(authState)
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileAnchorEl)

  const handleLogout = () => {
    auth.effects.logout()
    handleMenuClose()
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    handleProfileMenuClose()
  }

  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget)
  const handleProfileMenuClose = () => setAnchorEl(null)
  const handleMobileMenuOpen = event => setMobileAnchorEl(event.currentTarget)
  const handleMobileMenuClose = () => setMobileAnchorEl(null)

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <RiAccountCircleLine />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="sign out of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <FiLogOut />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>{'Messages'}</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{'Notifications'}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          color="inherit"
        >
          <RiAccountCircleLine />
        </IconButton>
        <p>{'Profile'}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          color="inherit"
        >
          <FiLogOut />
        </IconButton>
        <p>{'Sign Out'}</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" tip="ChampionIndex" style={{ color: 'white' }}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Hidden xsDown>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={'Search…'}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Hidden>
          <div className={classes.grow}>
            <Typography variant="h4" align="center" color="inherit">
              <Hidden smDown>{title.md}</Hidden>
              <Hidden mdUp xsDown>
                {title.sm}
              </Hidden>
              <Hidden smUp>{title.xs}</Hidden>
            </Typography>
          </div>
          {authenticated ? (
            [
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>,
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>,
            ]
          ) : (
            <div className={classes.sectionAuth}>
              <Button
                className={classes.button}
                component={Link}
                to="/sign-in"
                color="inherit"
                variant="outlined"
              >
                <Hidden only={['md']}>
                  <FiLogIn className={classes.icon} />
                </Hidden>
                <Hidden smDown>{'Sign in'}</Hidden>
              </Button>
              <Button component={Link} to="/sign-up" color="secondary" variant="contained">
                <Hidden only={['md']}>
                  <RiUserAddLine className={classes.icon} />
                </Hidden>
                <Hidden smDown>{'Sign up'}</Hidden>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionAuth: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    // width: '20%',
  },
  sectionDesktop: {
    display: 'none',
    justifyContent: 'flex-end',
    width: '18%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    margin: 3,
  },
  icon: {
    fontSize: '1.2rem',
    marginLeft: -5,
    [theme.breakpoints.up('lg')]: {
      marginRight: 5,
    },
  },
}))

export default Navbar
