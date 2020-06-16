import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import FilterPanel from 'components/champion/FilterPanel'
import ChampionGrouping from 'components/champion/ChampionGrouping'
import GroupingPanel from 'components/champion/GroupingPanel'
// State
import useMetadata from 'state/metadata'
import { championsDisplay, filtersState } from 'state/atoms'
import { createFilterWithState } from 'util/functions'

const ChampionIndex = () => {
  const classes = useStyles()
  const metadata = useMetadata().reducers.getMetadataState('metadata')
  const champions = useRecoilValue(championsDisplay)

  const [localFiltersState, setFiltersState] = useRecoilState(filtersState)
  useEffect(() => {
    const filtered = createFilterWithState(metadata, true)
    const { type, indeterminate } = localFiltersState
    setFiltersState({ type, indeterminate, filtered })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterTypes = ['Rarity', 'Affinity', 'Faction'] //, 'Role']

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Grid container direction="row">
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
        <Grid key="champions-column" className={classes.championsColumn} item lg={9} xs={12}>
          <GroupingPanel />
          {champions && <ChampionGrouping grouping={champions} level={0} />}
        </Grid>
      </Grid>
    </React.Suspense>
  )
}

const useStyles = makeStyles(() => ({
  filterColumn: { margin: 0 },
  championsColumn: { margin: 0 },
}))

export default ChampionIndex
