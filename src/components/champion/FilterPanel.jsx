import React from 'react'
// MUI
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
// Components
import ChampionFilter from 'components/champion/ChampionFilter'
import { makeStyles } from '@material-ui/core/styles'

const FilterPanel = () => {
  const classes = useStyles()

  const filterTypes = ['Rarity', 'Affinity', 'Faction'] //, 'Role']
  return (
    <Card className={classes.filterCard}>
      <CardHeader title="Filter Champions" className={classes.cardHeader} />
      {filterTypes.map(filterType => (
        <ChampionFilter key={`Filter-${filterType}`} filterType={filterType} />
      ))}
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  filterCard: {
    margin: 0,
    marginBottom: 10,
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  cardHeader: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  toggleContainer: {
    margin: theme.spacing(3, 0),
  },
}))

export default FilterPanel
