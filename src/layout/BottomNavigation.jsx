import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import MdBottomNavigation from '@material-ui/core/BottomNavigation'
// Icons
import {
  GiDiabloSkull,
  GiDungeonGate,
  GiTusksFlag,
  GiVerticalBanner,
  GiVikingHelmet,
} from 'react-icons/gi'
// State
import { useRecoilState } from 'recoil'
import { navState } from 'state/atoms'

const BottomNavigation = () => {
  const classes = useStyles()
  const location = useLocation()

  const [{ selected, routes }, setState] = useRecoilState(navState)
  const setSelected = selected => setState(previous => ({ ...previous, selected }))
  useEffect(() => {
    setSelected(routes.indexOf(location.pathname))
  }, [location])

  return (
    <MdBottomNavigation value={selected} showLabels className={classes.bottomNavigation}>
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        label="Champion Index"
        icon={<GiVerticalBanner />}
        component={Link}
        to={'/champion-index'}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        label="User's Champions"
        icon={<GiVikingHelmet />}
        component={Link}
        to={'/users-champions'}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        label="Dungeon Teams"
        icon={<GiDungeonGate />}
        component={Link}
        to={'/dungeon-teams'}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        label="Faction Wars"
        icon={<GiTusksFlag />}
        component={Link}
        to={'/faction-wars'}
      />
      <BottomNavigationAction
        classes={{
          root: classes.root,
          selected: classes.selected,
        }}
        label="Clan Boss"
        icon={<GiDiabloSkull />}
        component={Link}
        to={'/clan-boss'}
      />
    </MdBottomNavigation>
  )
}

const useStyles = makeStyles(theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.secondary.light,
    fontSize: '1.4rem',
    '&$selected': {
      color: theme.palette.secondary.light,
      fontSize: 30,
    },
  },
  /* Styles applied to the root element if selected. */
  selected: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
  },
  bottomNavigation: {
    backgroundColor: '#28282a',
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}))

export default BottomNavigation
