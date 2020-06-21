import React from 'react'
import 'components/bootstrap'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
// Icons
import SaveIcon from '@material-ui/icons/Save'
// State
import { useRecoilState, useRecoilValue } from 'recoil'
import { championsState, selectedState } from 'state/atoms'

const ActionPanel = ({ type }) => {
  const classes = useStyles()

  const [checked, setChecked] = useRecoilState(selectedState)
  const { championMap } = useRecoilValue(championsState)

  const handleIncrement = uid => () =>
    setChecked(previous => ({ ...previous, [uid]: previous[uid] + 1 }))
  const handleDecrement = uid => () =>
    setChecked(previous => ({ ...previous, [uid]: previous[uid] - 1 }))

  const title = type === 'pull' ? 'Add Champions to Inventory' : 'Remove Champions from Inventory'
  return (
    <Card className={classes.actionCard}>
      <CardHeader title={title} className={classes.cardHeader} />
      <List>
        {Object.keys(checked).map(uid => {
          const { name, avatar } = championMap[uid]
          return (
            checked[uid] > 0 && (
              <span key={`action-${uid}`}>
                <ListItem button>
                  <ListItemAvatar style={{ marginRight: 10 }}>
                    <Avatar alt={name} src={avatar} className={classes.large} />
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction style={{ marginRight: 10 }}>
                    <ButtonGroup size="large" color="secondary">
                      <Button variant="contained" onClick={handleIncrement(uid)}>
                        {'+'}
                      </Button>
                      <Button color="primary">{checked[uid]}</Button>
                      <Button variant="contained" onClick={handleDecrement(uid)}>
                        {'-'}
                      </Button>
                    </ButtonGroup>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </span>
            )
          )
        })}
      </List>
      <Fab variant="extended" color="secondary" aria-label="add" className={classes.fab}>
        <SaveIcon className={classes.extendedIcon} />
        {'Save'}
      </Fab>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  actionCard: {
    paddingBottom: 40,
    minHeight: '100%',
  },
  cardHeader: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  markedCenter: {
    width: 55,
    height: 2,
    margin: '8px auto 0',
    display: 'block',
    position: 'absolute',
    backgroundColor: theme.palette.secondary.main,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}))

export default ActionPanel
