import React from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import ChampionCard from 'components/champion/ChampionCard'
import ExpansionPanel from 'components/champion/ExpansionPanel'

const ChampionGrouping = ({ group, path }) => {
  const classes = useStyles()

  return group.name === 'Champions' ? (
    <Grid item container direction="row" className={classes.groupingRoot}>
      {<ExpansionPanel key="ep-champions" element={group} path="champions" />}
    </Grid>
  ) : (
    <Grid item container direction="row" className={classes.groupingRoot}>
      {group.map(element =>
        element.children ? (
          <ExpansionPanel
            key={`ep-${path}-${element.name}`}
            element={element}
            path={`${path}.${element.name}`}
          />
        ) : (
          <ChampionCard key={element.uid} champion={element} />
        ),
      )}
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  groupingRoot: {
    width: 'calc(100% - 16px)',
  },
}))

export default ChampionGrouping
