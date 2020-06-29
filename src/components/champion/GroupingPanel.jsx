import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Typography from '@material-ui/core/Typography'
// Icons
import { MdCropSquare, MdLooks3, MdLooksOne, MdLooksTwo } from 'react-icons/md'
// State
import { useRecoilState } from 'recoil'
import { groupingState } from 'state/atoms'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'

const GroupingPanel = () => {
  const classes = useStyles()
  const [groupings, setGroupings] = useRecoilState(groupingState)
  const [toggled, setToggled] = useState(() => ['faction', 'rarity'])

  const handleToggleClicked = (event, name) => {
    const max = groupings.reduce((agg, item) => (item.order > 0 ? ++agg : agg, agg), 1)
    const prior = groupings.find(grouping => name === grouping.type).order
    const checking = prior === 0
    const newGrouping = groupings.map(item => {
      let { order, type } = item
      if (checking) {
        if (type === name) order = max
      } /* unchecking */ else {
        if (type === name) order = 0
        else if (order > prior) order = item.order - 1
      }
      return { order, type }
    })
    setGroupings(newGrouping)

    const newToggled = checking ? [...toggled, name] : toggled.filter(toggle => name !== toggle)
    setToggled(newToggled)
  }

  const customIcons = {
    0: <MdCropSquare size={24} style={{ paddingRight: 6 }} />,
    1: <MdLooksOne size={24} className={classes.icons} />,
    2: <MdLooksTwo size={24} className={classes.icons} />,
    3: <MdLooks3 size={24} className={classes.icons} />,
  }

  return (
    <Card className={classes.groupingCard}>
      <CardHeader title="Group Champions" className={classes.cardHeader} />
      <Grid container justify="center" className={classes.toggleContainer}>
        <ToggleButtonGroup value={toggled} aria-label="text alignment" style={{ height: 58 }}>
          {groupings.map(({ type, order }) => (
            <ToggleButton
              key={`ToggleButton-${type}`}
              value={type}
              aria-label={type}
              onClick={handleToggleClicked}
            >
              {customIcons[order]}
              <Typography style={{ paddingRight: 8 }}>{type}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  groupingCard: {
    margin: 0,
    width: '100%',
  },
  cardHeader: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  toggleContainer: {
    margin: theme.spacing(3, 0),
  },
  icons: {
    paddingRight: 6,
    color: theme.palette.secondary.main,
  },
}))

export default GroupingPanel
