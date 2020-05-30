import React from 'react'
import { useQuery } from 'react-query'
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
// import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// Components
import Button from '../Button'
import Spinner from '../Spinner'
// State
import useChampions from '../../state/champions'

const Champion = ({ activeChampion, setActiveChampion }) => {
  const classes = useStyles()
  const champ = useChampions()
  const { data, isFetching } = useQuery(
    ['champion', { uid: activeChampion }],
    champ.effects.fetchChampion,
  )

  const { name, attributes } = data
  return (
    <>
      {isFetching && <Spinner />}
      <Button onClick={() => setActiveChampion(null)}>Back</Button>
      {data && (
        <Card className={classes.card}>
          <CardHeader>{data.name}</CardHeader>
          {/*<CardMedia image={userImage} title="Profile image" className={classes.image} />*/}
          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary">
              {name}
            </Typography>
            <ul>
              {Object.keys(attributes).map(key => (
                <li>
                  {key}:{attributes[key]}
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
