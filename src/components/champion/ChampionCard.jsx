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
import { activeChampionState } from 'state/atoms'
import { colors } from 'styles/colors'

const ChampionCard = ({ champion }) => {
  const classes = useStyles()

  const setActiveChampion = useSetRecoilState(activeChampionState)
  const handleClick = uid => () => setActiveChampion(uid)

  const { affinity, faction, rarity } = champion.attributes
  const { borderColor, gradient } = colors[rarity.name]
  return (
    <Card key={champion.uid} className={classes.card} style={{ background: gradient }}>
      <CardActionArea onClick={handleClick(champion.uid)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.name}>
            {champion.name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {faction && faction.name}
          </Typography>
          <CardMedia
            className={classes.media}
            image={champion.avatar}
            title={champion.name}
            style={{ borderColor }}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style={affinity && colors[affinity.name]}>
          {affinity && affinity.name}
        </Button>
        <Button size="small" color="primary">
          RANK-UP
        </Button>
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 185,
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
}))

export default ChampionCard
