import React, { useEffect, useState } from 'react'
import 'components/bootstrap'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
// Components
import ChampionDetails from 'components/champion/ChampionDetails'
import ChampionGrouping from 'components/champion/ChampionGrouping'
import FilterPanel from 'components/champion/FilterPanel'
import GroupingPanel from 'components/champion/GroupingPanel'
// State
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeChampionState } from 'state/atoms'
import { championsDisplay, filtersState } from 'state/atoms'
import { createFilterWithState } from 'util/functions'
import useMetadata from 'state/metadata'
import Typography from 'components/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

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

  const filterTypes = ['Rarity', 'Affinity', 'Faction'] //, 'Role']
  const toggledTypes = ['Pull', 'Consume']

  const [toggled, setToggled] = useState([])
  const handleToggle = (event, state) => setToggled(state)

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {activeChampion ? (
        <ChampionDetails />
      ) : (
        <Grid key="full-page" container direction="column">
          <Grid key="header-row" container direction="row">
            <div style={{ width: '100%', marginBottom: 20 }}>
              <Typography variant="h4" marked="center" align="center">
                Champion Index
              </Typography>
              <ToggleButtonGroup
                value={toggled}
                aria-label="text alignment"
                style={{ height: 58 }}
                onChange={handleToggle}
              >
                {toggledTypes.map(type => (
                  <ToggleButton key={`ToggleButton-${type}`} value={type} aria-label={type}>
                    <Typography style={{ paddingRight: 8 }}>{type}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </Grid>
          <Grid key="main-content-row" container direction="row">
            <Grid
              key="filter-column"
              className={classes.filterColumn}
              alignItems="center"
              container
              direction="column"
              item
              lg={3}
              xs={12}
              spacing={3}
            >
              {filterTypes.map(filterType => (
                <FilterPanel key={`Filter-${filterType}`} filterType={filterType} />
              ))}
            </Grid>
            <Grid key="champions-column" className={classes.championsColumn} item lg={6} xs={12}>
              <GroupingPanel key="grouping-header" />
              {group && <ChampionGrouping group={group} path="champions" />}
            </Grid>
            <Grid key="acquired-column" className={classes.acquiredColumn} item lg={3} xs={12}>
              <Card style={{ height: '83vh' }}>test</Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Suspense>
  )
}

const useStyles = makeStyles(() => ({
  filterColumn: { margin: 0 },
  championsColumn: { margin: 0 },
}))

export default ChampionsHome
