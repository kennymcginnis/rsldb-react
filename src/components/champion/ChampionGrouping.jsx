import React, { useState } from 'react'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// Components
import ChampionCard from 'components/champion/ChampionCard'

const ChampionGrouping = ({ grouping, level }) => {
  const classes = useStyles()

  // const defaults grouping
  const defaults = grouping.map((i, index) => level > 0 || index === 0)
  const [expanded, setExpanded] = React.useState(defaults)
  const handleChange = index => (event, isExpanded) => {
    const newExpanded = [...expanded]
    newExpanded[index] = isExpanded
    setExpanded(newExpanded)
  }

  return (
    <Grid item container direction="row" className={classes.groupingRoot}>
      {grouping.map((element, index) =>
        Array.isArray(element.children) ? (
          <ExpansionPanel
            className={classes.expansionPanel}
            key={`ep-${level}-${index}`}
            expanded={expanded[index]}
            onChange={handleChange(index)}
          >
            <ExpansionPanelSummary
              {...(expanded[index] && { className: classes.expansionPanelSummary })}
              id={`eps-${level}-${index}`}
              key={`eps-${level}-${index}`}
              expandIcon={
                <ExpandMoreIcon {...(expanded[index] && { className: classes.expandMoreIcon })} />
              }
            >
              <Typography className={classes.heading}>{element.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {expanded[index] && (
                <ChampionGrouping grouping={element.children} level={level + 1} />
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : (
          <ChampionCard key={element.uid} champion={element} />
        ),
      )}
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  groupingRoot: {
    marginTop: 12,
    width: 'calc(100% - 10px)',
  },
  expansionPanel: {
    width: '100%',
  },
  expansionPanelSummary: {
    color: 'white',
    backgroundColor: '#4035d0',
  },
  expandMoreIcon: {
    color: 'white',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default ChampionGrouping
