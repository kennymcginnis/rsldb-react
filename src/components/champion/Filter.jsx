import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// Icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
// State
import { useRecoilValue } from 'recoil'
import useFilters from 'state/filters'
import { filtersState } from 'state/atoms'

const Filter = ({ filterType, items }) => {
  const classes = useStyles()

  const {
    type: { [filterType]: type },
    filtered,
    indeterminate: { [filterType]: indeterminate },
  } = useRecoilValue(filtersState)
  const { handleTypeToggled, handleFilterToggled } = useFilters().reducers

  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemIcon>
          <Checkbox
            checked={type}
            disableRipple
            edge="start"
            indeterminate={indeterminate}
            inputProps={{ 'aria-labelledby': `checkbox-list-label-${type}` }}
            onChange={handleTypeToggled(filterType, items)}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={type} onClick={handleClick} />
        {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(listItem => {
            const { uid, name } = listItem
            return (
              <ListItem key={uid} role={undefined} dense button onClick={handleFilterToggled(uid)}>
                <ListItemIcon>
                  <Checkbox
                    checked={filtered[uid]}
                    className={classes.filterCheckBox}
                    disableRipple
                    edge="start"
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${uid}` }}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={`checkbox-list-label-${uid}`} primary={name} />
              </ListItem>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  filterCheckBox: {
    marginLeft: 18,
  },
}))

export default Filter
