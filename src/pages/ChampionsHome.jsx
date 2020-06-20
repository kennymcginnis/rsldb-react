import React, { useEffect, useState } from 'react'
import 'components/bootstrap'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
// Components
import ActionPanel from 'components/champion/ActionPanel'
import ChampionDetails from 'components/champion/ChampionDetails'
import ChampionGrouping from 'components/champion/ChampionGrouping'
import FilterPanel from 'components/champion/FilterPanel'
import GroupingPanel from 'components/champion/GroupingPanel'
import SearchPanel from 'components/champion/SearchPanel'
import Typography from 'components/Typography'
// State
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeChampionState } from 'state/atoms'
import { championsDisplay, filtersState } from 'state/atoms'
import { createFilterWithState } from 'util/functions'
import useMetadata from 'state/metadata'

const ChampionsHome = () => {
  const classes = useStyles()

  const group = useRecoilValue(championsDisplay)
  const { activeChampion } = useRecoilValue(activeChampionState)
  const metadata = useMetadata().reducers.getMetadataState('metadata')

  const [localFiltersState, setFiltersState] = useRecoilState(filtersState)
  useEffect(() => {
    const filtered = createFilterWithState(metadata, true)
    const { type, indeterminate } = localFiltersState
    setFiltersState({ type, indeterminate, filtered })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupFilterTypes = ['Group', 'Search', 'Filter']
  const pullConsumeTypes = ['Pull Champions', 'Consume Champions']

  const [groupFilter, setGroupFilterToggle] = useState([])
  const [pullConsume, setPullConsumeToggle] = useState('')
  const handleGroupFilterToggle = (event, state) => setGroupFilterToggle(state)
  const handlePullConsumeToggle = (event, state) => setPullConsumeToggle(state)

  const small = { item: true, lg: 3, xs: 12 }
  const medium = { item: true, lg: 6, xs: 12 }

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {activeChampion ? (
        <ChampionDetails />
      ) : (
        <Grid key="full-page" container direction="column">
          <Grid key="header-row" className={classes.headerRow} container direction="row">
            <Grid key="currently-empty" className={classes.leftColumn} {...small}>
              <ToggleButtonGroup
                value={groupFilter}
                aria-label="group or filter champions"
                className={classes.buttonGroup}
                onChange={handleGroupFilterToggle}
              >
                {groupFilterTypes.map(type => (
                  <ToggleButton key={`ToggleButton-${type}`} value={type} aria-label={type}>
                    <Typography style={{ padding: 8 }}>{type}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
            <Grid key="title-column" className={classes.centerColumn} {...medium}>
              <Typography variant="h4" marked="center" align="center">
                Champion Index
              </Typography>
            </Grid>
            <Grid key="action-selector" className={classes.rightColumn} {...small}>
              <ToggleButtonGroup
                exclusive
                value={pullConsume}
                aria-label="pull or consume champions"
                className={classes.buttonGroup}
                onChange={handlePullConsumeToggle}
              >
                {pullConsumeTypes.map(type => (
                  <ToggleButton key={`ToggleButton-${type}`} value={type} aria-label={type}>
                    <Typography style={{ padding: 8 }}>{type}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid key="main-content-row" container direction="row">
            {groupFilter.length > 0 && (
              <Grid key="filter-column" className={classes.leftColumn} {...small}>
                {groupFilter.includes('Group') && <GroupingPanel />}
                {groupFilter.includes('Search') && <SearchPanel />}
                {groupFilter.includes('Filter') && <FilterPanel />}
              </Grid>
            )}
            <Grid
              key="champions-column"
              className={classes.centerColumn}
              {...{
                ...medium,
                lg: 12 - (groupFilter?.length ? 3 : 0) - (!!pullConsume ? 3 : 0),
              }}
            >
              {group && <ChampionGrouping group={group} path="champions" />}
            </Grid>
            {pullConsume && (
              <Grid key="acquired-column" className={classes.rightColumn} {...small}>
                <ActionPanel type={pullConsume} />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </React.Suspense>
  )
}

const useStyles = makeStyles(() => ({
  leftColumn: {
    width: '100%',
    margin: 0,
  },
  centerColumn: {
    margin: 0,
  },
  rightColumn: {
    margin: 0,
    width: '100%',
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
}))

export default ChampionsHome
