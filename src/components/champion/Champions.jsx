import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import ChampionCard from 'components/champion/ChampionCard'
import Filter from 'components/champion/Filter'
// State
import { filteredChampionsState, filtersState, metadataState } from 'state/atoms'
import { createFilterWithState } from 'util/functions'

const Champions = () => {
  const classes = useStyles()

  const metadata = useRecoilValue(metadataState)
  const { affinity, faction, rarity, role } = metadata.metadataTypeMap

  const champions = useRecoilValue(filteredChampionsState)

  const [filtered, setFilterState] = useRecoilState(filtersState)
  useEffect(() => {
    const defaults = createFilterWithState(metadata.metadata, true)
    setFilterState({ ...defaults, ...filtered })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Filter type="Rarity" items={rarity} />
          <Filter type="Affinity" items={affinity} />
          <Filter type="Faction" items={faction} />
          <Filter type="Role" items={role} />
        </Grid>
        <Grid item container sm={9} xs={12} spacing={3} className={classes.gridList}>
          {champions.map(champion => (
            <ChampionCard {...{ champion }} />
          ))}
        </Grid>
      </Grid>
    </React.Suspense>
  )
}

const useStyles = makeStyles(() => ({
  gridList: {},
}))

export default Champions
