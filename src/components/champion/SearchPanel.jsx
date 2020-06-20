import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
// Icons
import Clear from '@material-ui/icons/Clear'
// State
import { useRecoilState } from 'recoil'
import { filtersState } from 'state/atoms'
import debounce from '@material-ui/core/utils/debounce'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'

const SearchPanel = () => {
  const classes = useStyles()
  const [filters, setFilters] = useRecoilState(filtersState)

  const [searched, setSearched] = useState('')
  const handleSearchForChanged = event => {
    const searched = event.target.value.toLowerCase()
    setSearched(searched)
    // Adding a delay on champion filter, because there can be a lot of champs rendered
    setDebouncedSearch(searched)
  }
  const handleSearchForCleared = event => {
    setSearched('')
    setFilters(previous => ({ ...previous, searched: '' }))
  }
  const setDebouncedSearch = debounce(searched => {
    setFilters({ ...filters, searched })
  }, 1000)

  return (
    <Card className={classes.searchCard}>
      <CardHeader title="Search Champions" className={classes.cardHeader} />
      <Grid container justify="center" className={classes.searchContainer}>
        <FormControl className={classes.textField} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">{'SEARCH FOR...'}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            value={searched}
            onChange={handleSearchForChanged}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleSearchForCleared}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={120}
          />
        </FormControl>
      </Grid>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  searchCard: {
    margin: 0,
    marginBottom: 10,
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  cardHeader: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  searchContainer: {
    margin: theme.spacing(3, 0),
  },
  textField: {
    width: '85%',
  },
}))

export default SearchPanel
