import React from 'react'
import PropTypes from 'prop-types'
import MuiSnackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const Transition = props => <Slide {...props} direction="down" />

const Snackbar = props => {
  const classes = useStyles()
  const { onClose, message, ...other } = props

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      transition={Transition}
      ContentProps={{
        classes: {
          root: classes.content,
          message: classes.contentMessage,
          action: classes.contentAction,
        },
      }}
      message={
        <>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

Snackbar.propTypes = {
  SnackbarContentProps: PropTypes.object,
}

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    flexWrap: 'inherit',
    [theme.breakpoints.up('md')]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  contentMessage: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
  },
  contentAction: {
    paddingLeft: theme.spacing(2),
  },
  info: {
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },
  close: {
    padding: theme.spacing(1),
  },
}))

export default Snackbar
