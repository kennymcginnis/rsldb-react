import React, { useMemo, useRef, useState } from 'react'
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
import { useRecoilState } from 'recoil'
import { activeChampionState } from 'state/atoms/index'
import useFilters from 'state/filters'
// Styles
import { colors } from 'styles/colors'
import Check from '@material-ui/icons/Check'
import { selectedState } from '../../state/atoms'

const ChampionCard = ({ champion }) => {
  const classes = useStyles()
  const { affinity, faction, rarity } = champion.attributes
  const { borderColor, gradient } = colors[rarity.name]

  const [checked, setChecked] = useRecoilState(selectedState)
  const handleClick = uid => () => {
    const isChecked = !checked[uid]
    setChecked(previous => ({
      ...previous,
      [uid]: isChecked,
    }))
  }
  const { handleFilterTypeOnly } = useFilters().reducers

  return useMemo(
    () => (
      <Card key={champion.uid} className={classes.card} style={{ background: gradient }}>
        <CardActionArea style={{ height: 220 }} onClick={handleClick(champion.uid)}>
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
            {checked[champion.uid] && (
              <div className={classes.overlay}>
                <Check className={classes.checkBox} />
              </div>
            )}
          </CardContent>
        </CardActionArea>
        <Button
          size="small"
          color="primary"
          fullWidth
          onClick={handleFilterTypeOnly('Faction', faction?.uid || '')}
        >
          {faction?.name || 'TODO'}
        </Button>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            fullWidth
            style={affinity && colors[affinity.name]}
            onClick={handleFilterTypeOnly('Affinity', affinity.uid)}
          >
            {affinity && affinity.name}
          </Button>
          <Button size="small" color="primary" fullWidth className={classes.bottomButton}>
            RANK-UP
          </Button>
        </CardActions>
      </Card>
    ),
    [champion, checked[champion.uid]],
  )
}

const useStyles = makeStyles(() => ({
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
  overlay: {
    top: 0,
    left: 0,
    width: '100%',
    height: 280,
    position: 'absolute',
    backgroundColor: '#353434bd',
  },
  checkBox: {
    width: '2em',
    height: '2em',
    fontSize: '2rem',
    color: '#6fa2ff',
  },
}))

export default ChampionCard
