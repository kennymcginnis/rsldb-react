import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../TooltipIconButton'
import DeleteChampion from './DeleteChampion'
import ChampionDialog from './ChampionDialog'
import LikeButton from './LikeButton'
// MUI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// Icons
import ChatIcon from '@material-ui/icons/Chat'
// Redux
import { useSelector } from 'react-state'

const Champion = ({
  champion: { body, createdAt, userImage, userHandle, championId, likeCount, commentCount },
  openDialog,
}) => {
  dayjs.extend(relativeTime)
  const classes = useStyles()
  const {
    authenticated,
    credentials: { handle },
  } = useSelector(state => state.user)

  const deleteButton =
    authenticated && userHandle === handle ? <DeleteChampion {...{ championId }} /> : null
  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title="Profile image" className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  )
}

Champion.propTypes = {
  user: PropTypes.object.isRequired,
  champion: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
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
