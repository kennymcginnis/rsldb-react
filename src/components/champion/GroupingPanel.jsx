import React from 'react'
import clsx from 'clsx'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Typography from '@material-ui/core/Typography'
// Icons
import Search from '@material-ui/icons/Search'
import { MdCropSquare, MdLooks3, MdLooksOne, MdLooksTwo } from 'react-icons/md'
// State
import { useRecoilState } from 'recoil'
import { filtersState, groupingState } from 'state/atoms'
import { useDebouncedCallback } from 'util/useDebouncedCallback'

const GroupingPanel = () => {
  const classes = useStyles()
  const [filters, setFilters] = useRecoilState(filtersState)
  const [groupings, setGroupings] = useRecoilState(groupingState)
  const [toggled, setToggled] = React.useState(() => ['faction', 'rarity'])

  const debouncedSetValue = useDebouncedCallback(showAlert, 500)

  const [value, setValue] = useRecoilState(groupingState)
  const handleClick = (event, name) => {
    const max = groupings.reduce((agg, item) => (item.order > 0 ? ++agg : agg, agg), 1)
    const prior = groupings.find(grouping => name === grouping.type).order
    const checking = prior === 0
    const newGrouping = groupings.map(item => {
      let { order, type } = item
      if (checking) {
        if (type === name) {
          order = max
        }
      } /* unchecking */ else {
        if (type === name) {
          order = 0
        } else if (order > prior) {
          order = item.order - 1
        }
      }
      return { order, type }
    })
    setGroupings(newGrouping)

    const newToggled = checking ? [...toggled, name] : toggled.filter(toggle => name !== toggle)
    setToggled(newToggled)
  }

  const handleChange = event => {
    setFilters({ ...filters, searched: event.target.value })
  }

  return (
    <Card className={classes.sortingCard}>
      <Grid
        container
        alignItems="center"
        spacing={2}
        className={classes.root}
        style={{ flexWrap: 'nowrap' }}
      >
        <Grid item sm={12} lg={4}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup value={toggled} aria-label="text alignment" style={{ height: 58 }}>
              {groupings.map(({ type, order }) => (
                <ToggleButton
                  key={`ToggleButton-${type}`}
                  value={type}
                  aria-label={type}
                  onClick={handleClick}
                >
                  {customIcons[order]}
                  <Typography style={{ paddingRight: 8 }}>{type}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </Grid>
        <Grid item sm={12} lg={8}>
          <div className={classes.searchContainer}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">{'SEARCH FOR...'}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                value={filters.searched || ''}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={120}
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

const customIcons = {
  0: <MdCropSquare size={24} style={{ paddingRight: 6 }} />,
  1: <MdLooksOne size={24} style={{ paddingRight: 6, color: '#4035d0' }} />,
  2: <MdLooksTwo size={24} style={{ paddingRight: 6, color: '#4035d0' }} />,
  3: <MdLooks3 size={24} style={{ paddingRight: 6, color: '#4035d0' }} />,
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 10,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  toggleContainer: {
    margin: theme.spacing(3, 0),
  },
  searchContainer: {
    margin: theme.spacing(3, 0),
  },
  sortingCard: {
    margin: 0,
    width: 'calc(100% - 10px)',
  },
  textField: {
    width: '35ch',
  },
}))

export default GroupingPanel
