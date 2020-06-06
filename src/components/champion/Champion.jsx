import React from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
// Components
import Button from 'components/Button'
// State
import { useRecoilValue } from 'recoil'
import { championSelector } from 'state/atoms'

const Champion = ({ activeChampion, setActiveChampion }) => {
  const classes = useStyles()
  const champion = useRecoilValue(championSelector(activeChampion))
  return (
    <>
      <Button onClick={() => setActiveChampion(null)}>Back</Button>
      {champion && (
        <Card className={classes.card}>
          <CardHeader>{champion.name}</CardHeader>
          {/*<CardMedia image={userImage} title="Profile image" className={classes.image} />*/}
          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary">
              {champion.name}
            </Typography>
            <ul>
              {Object.keys(champion.attributes).map(key => (
                <li>
                  {key}:{champion.attributes[key]}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}))

export default Champion
