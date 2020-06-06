import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
// Components
import EditDetails from 'components/profile/EditDetails'
import MyButton from 'components/TooltipIconButton'
// Util
import ProfileSkeleton from 'util/ProfileSkeleton'
// State
import useAuth from 'state/auth'

const Profile = ({
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated,
  },
}) => {
  const auth = useAuth()
  const classes = useStyles()

  return !loading ? (
    authenticated ? (
      <Paper className={classes.paper} elevation={2}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip="Logout" onClick={auth.reducers.logout()}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  )
}

const useStyles = makeStyles(theme => ({
  // ...theme
}))

Profile.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Profile
