import React from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// State
import { useSetRecoilState } from 'recoil'
import { activeChampionState } from 'state/atoms/index'
import useFilters from 'state/filters'
// Styles
import { colors } from 'styles/colors'

const ChampionCard = ({ champion }) => {
  const classes = useStyles()

  const setActiveChampion = useSetRecoilState(activeChampionState)
  const handleClick = uid => () => setActiveChampion({ activeChampion: uid })

  const filters = useFilters()
  const { affinity, faction, rarity } = champion.attributes
  const { borderColor, gradient } = colors[rarity.name]
  return (
    <Card className={classes.card} style={{ background: gradient }}>
      <CardActionArea style={{ height: 220 }} onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
            {champion.name.toUpperCase()}
          </Typography>
          <CardMedia
            className={classes.media}
            image={champion.avatar}
            title={champion.name}
            style={{ borderColor }}
          />
        </CardContent>
      </CardActionArea>
      <Button
        size="small"
        color="primary"
        fullWidth
        onClick={filters.reducers.handleFilterTypeOnly('Faction', faction?.uid || '')}
      >
        {faction?.name || 'TODO'}
      </Button>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          fullWidth
          style={affinity && colors[affinity.name]}
          onClick={filters.reducers.handleFilterTypeOnly('Affinity', affinity.uid)}
        >
          {affinity && affinity.name}
        </Button>
        <Button size="small" color="primary" fullWidth className={classes.bottomButton}>
          RANK-UP
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    width: 185,
    margin: '0.5vw',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  media: {
    height: 140,
  },
  cardActions: {
    padding: 0,
    justifyContent: 'space-between',
  },
}))

export default ChampionCard
