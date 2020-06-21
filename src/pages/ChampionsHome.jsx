import React, { useState } from 'react'
import 'components/bootstrap'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
// Icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import SearchIcon from '@material-ui/icons/Search'
import { BsListNested } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'
// Components
import ActionPanel from 'components/champion/ActionPanel'
import ChampionDetails from 'components/champion/ChampionDetails'
import ChampionGrouping from 'components/champion/ChampionGrouping'
import FilterPanel from 'components/champion/FilterPanel'
import GroupingPanel from 'components/champion/GroupingPanel'
import SearchPanel from 'components/champion/SearchPanel'
import Typography from 'components/Typography'
// State
import { useRecoilValue } from 'recoil'
import { activeChampionState } from 'state/atoms'
import { championsDisplay } from 'state/atoms'
import Hidden from '@material-ui/core/Hidden'

const ChampionsHome = () => {
  const classes = useStyles()

  const group = useRecoilValue(championsDisplay)
  const { activeChampion } = useRecoilValue(activeChampionState)

  const [groupFilter, setGroupFilterToggle] = useState([])
  const [pullConsume, setPullConsumeToggle] = useState('')
  const handleGroupFilterToggle = (event, state) => setGroupFilterToggle(state)
  const handlePullConsumeToggle = (event, state) => setPullConsumeToggle(state)

  const small = { item: true, md: 3, xs: 12 }
  const medium = { item: true, md: 6, xs: 12 }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {activeChampion ? (
        <ChampionDetails />
      ) : (
        <Grid key="full-page" container direction="column">
          <Grid
            key="header-row"
            className={classes.headerRow}
            container
            direction="row"
            justify="center"
          >
            <Hidden lgUp>
              <Typography variant="h4" marked="center" align="center">
                Champion Index
              </Typography>
            </Hidden>
          </Grid>
          <Grid
            key="subheader-row"
            className={classes.headerRow}
            container
            direction="row"
            justify="space-between"
          >
            <Grid key="group-filter-col" className={classes.column}>
              <ToggleButtonGroup
                value={groupFilter}
                aria-label="group or filter champions"
                className={classes.buttonGroup}
                onChange={handleGroupFilterToggle}
              >
                <ToggleButton key="ToggleButton-Group" value="Group" aria-label="Group">
                  <BsListNested className={classes.icons} style={{ fontSize: '1.4rem' }} />
                  <Typography style={{ padding: 8 }}>Group</Typography>
                </ToggleButton>
                <ToggleButton key="ToggleButton-Search" value="Search" aria-label="Search">
                  <SearchIcon className={classes.icons} />
                  <Typography style={{ padding: 8 }}>Search</Typography>
                </ToggleButton>
                <ToggleButton key="ToggleButton-Filter" value="Filter" aria-label="Filter">
                  <FiFilter className={classes.icons} style={{ fontSize: '1.2rem' }} />
                  <Typography style={{ padding: 8 }}>Filter</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Hidden mdDown>
              <Grid key="title-column" className={classes.column}>
                <Typography variant="h4" marked="center" align="center">
                  Champion Index
                </Typography>
              </Grid>
            </Hidden>
            <Grid key="action-selector" className={classes.column}>
              <ToggleButtonGroup
                exclusive
                value={pullConsume}
                aria-label="pull or consume champions"
                className={classes.buttonGroup}
                onChange={handlePullConsumeToggle}
              >
                <ToggleButton key="Toggle-Pull" value="pull" aria-label="Pull Champions">
                  <AddCircleOutlineIcon color="secondary" />
                  <Typography style={{ padding: 8 }}>Pull Shards</Typography>
                </ToggleButton>
                <ToggleButton key="Toggle-Consume" value="consume" aria-label="Consume Champions">
                  <RemoveCircleOutlineIcon color="secondary" />
                  <Typography style={{ padding: 8 }}>Consume</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid key="main-content-row" container direction="row">
            {groupFilter.length > 0 && (
              <Grid key="filter-column" className={classes.column} {...small}>
                {groupFilter.includes('Group') && <GroupingPanel />}
                {groupFilter.includes('Search') && <SearchPanel />}
                {groupFilter.includes('Filter') && <FilterPanel />}
              </Grid>
            )}
            <Grid
              key="champions-column"
              className={classes.column}
              {...{
                ...medium,
                md: 12 - (groupFilter?.length ? 3 : 0) - (!!pullConsume ? 3 : 0),
              }}
            >
              {group && <ChampionGrouping key="champ-group" group={group} path="champions" />}
            </Grid>
            {pullConsume && (
              <Grid key="acquired-column" className={classes.row} {...small}>
                <ActionPanel type={pullConsume} />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </React.Suspense>
  )
}

const useStyles = makeStyles(theme => ({
  row: {
    width: '100%',
    margin: 0,
  },
  column: {
    margin: 0,
  },
  headerRow: {
    width: '100%',
    marginBottom: 20,
  },
  buttonGroup: {
    height: 58,
    margin: 10,
  },
  button: {
    width: 120,
  },
  icons: {
    color: theme.palette.secondary.main,
  },
}))

export default ChampionsHome
