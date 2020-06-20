import React from 'react'
import 'components/bootstrap'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
// Icons
import DeleteIcon from '@material-ui/icons/Delete'
// State
import { useRecoilState, useRecoilValue } from 'recoil'
import { championsState, selectedState } from 'state/atoms'
import Button from '../Button'

const ActionPanel = ({ type }) => {
  const classes = useStyles()

  const [checked, setChecked] = useRecoilState(selectedState)
  const { championMap } = useRecoilValue(championsState)

  const handleDelete = uid => () => {
    setChecked(previous => ({ ...previous, [uid]: false }))
  }

  return (
    <Card style={{ minHeight: '83vh' }}>
      <CardHeader title={type} className={classes.cardHeader}>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </CardHeader>
      <List>
        {Object.keys(checked).map(uid => {
          const { name, avatar } = championMap[uid]
          return (
            checked[uid] && (
              <span key={`action-${uid}`}>
                <ListItem button>
                  <ListItemAvatar style={{ marginRight: 10 }}>
                    <Avatar alt={name} src={avatar} className={classes.large} />
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction style={{ marginRight: 10 }}>
                    <IconButton edge="end" aria-label="delete" onClick={handleDelete(uid)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </span>
            )
          )
        })}
      </List>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
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
}))

export default ActionPanel
