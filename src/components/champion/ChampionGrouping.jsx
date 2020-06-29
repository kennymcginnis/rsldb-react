import React from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import ChampionCard from 'components/champion/ChampionCard'
import ExpansionPanel from 'components/champion/ExpansionPanel'

const ChampionGrouping = ({ group, path }) => {
  const classes = useStyles()

  return (
    <Grid item container direction="row" className={classes.groupingRoot}>
      {group.name === 'Champions' ? (
        <ExpansionPanel key="ep-champions" element={group} path="champions" />
      ) : (
        group.map((element, index) =>
          element.children ? (
            <ExpansionPanel
              key={`ep-${path}-${element.name}`}
              element={element}
              path={`${path}.${element.name}`}
            />
          ) : (
            <ChampionCard key={element.uid} champion={element} />
          ),
        )
      )}
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  groupingRoot: {
    width: '100%',
  },
  expansionPanel: {},
}))

export default ChampionGrouping
