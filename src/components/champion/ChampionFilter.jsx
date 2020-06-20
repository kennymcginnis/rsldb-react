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
import { filtersState } from 'state/atoms/champions'
import useFilters from 'state/filters'
import useMetadata from 'state/metadata'

const ChampionFilter = ({ filterType }) => {
  const classes = useStyles()

  const localFiltersState = useRecoilValue(filtersState)
  const type = localFiltersState.type[filterType]
  const indeterminate = localFiltersState.indeterminate[filterType]
  const { filtered } = localFiltersState

  const { handleTypeToggled, handleFilterToggled } = useFilters().reducers

  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  const items = useMetadata().reducers.getMetadataState(filterType)

  return (
    <List className={classes.root}>
      <ListItem button>
        <ListItemIcon>
          <Checkbox
            checked={type}
            disableRipple
            edge="start"
            indeterminate={indeterminate}
            inputProps={{ 'aria-labelledby': `checkbox-list-label-${filterType}` }}
            onChange={handleTypeToggled(filterType)}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={filterType} onClick={handleClick} />
        {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(({ uid, name }) => (
            <ListItem
              key={`list-item-${uid}`}
              button
              dense
              onClick={handleFilterToggled(uid, filterType)}
            >
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
          ))}
        </List>
      </Collapse>
    </List>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    backgroundColor: theme.palette.background.paper,
  },
  filterCheckBox: {
    marginLeft: 18,
  },
}))

export default ChampionFilter
