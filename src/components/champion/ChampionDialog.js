import React, { Component, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MyButton from 'TooltipIconButton'
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import champions from '.state/champions'

const ChampionDialog = ({ championId, userHandle, openDialog }) => {
  const classes = useStyles()
  const { state, setState } = useState({
    open: false,
    oldPath: '',
    newPath: '',
  })

  useEffect(() => {
    if (openDialog) handleOpen()
  }, [])

  const handleOpen = () => {
    let oldPath = window.location.pathname
    const newPath = `/champion/${championId}`
    if (oldPath === newPath) oldPath = `/users/${userHandle}`
    window.history.pushState(null, null, newPath)
    const champion = champions.reducers.getChampion(championId)
    setState({ open: true, oldPath, newPath, champion })
  }

  const handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false })
  }

  const dialogMarkup = (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img src={state.champion.avatar} alt="avatar" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(new Date()).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
      </Grid>
      <hr className={classes.visibleSeparator} />
    </Grid>
  )

  return (
    <Fragment>
      <MyButton onClick={this.handleOpen} tip="Expand champion" tipClassName={classes.expandButton}>
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </Fragment>
  )
}

ChampionDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getChampion: PropTypes.func.isRequired,
  championId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  champion: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const useStyles = makeStyles(theme => ({
  ...theme.styles,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
}))

export default ChampionDialog
