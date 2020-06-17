import React, { useState } from 'react'
import getByPath from 'lodash/get'
import setByPath from 'lodash/set'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs'
// Components
import ChampionCard from 'components/champion/ChampionCard'
// State
import { useRecoilState } from 'recoil'
import { expandedState } from 'state/atoms'

const ChampionGrouping = ({ grouping, path, level, levelCount }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useRecoilState(expandedState)
  const handleExpandCollapse = name => (event, isExpanded) =>
    setExpanded({ ...expanded, [name]: isExpanded })

  const [expandedSection, setExpandedSection] = useState({})
  const handleExpandCollapseSection = (element, currentPath) => event => {
    event.stopPropagation()
    const isExpanded = !expandedSection[currentPath]
    setExpandedSection({ ...expandedSection, [currentPath]: isExpanded })

    const newExpanded = { ...expanded, [currentPath]: isExpanded }
    element.children.forEach(child => (newExpanded[`${currentPath}.${child.name}`] = isExpanded))
    setExpanded(newExpanded)
  }

  const ExpansionPanel = ({ currentPath, element }) => (
    <ExpansionPanel
      className={classes.expansionPanel}
      expanded={expanded[currentPath] || false}
      onChange={handleExpandCollapse(currentPath)}
    >
      <ExpansionPanelSummary
        {...(expanded[currentPath] && { className: classes.expansionPanelSummary })}
        id={`eps-${currentPath}`}
        expandIcon={
          <ExpandMoreIcon {...(expanded[currentPath] && { className: classes.expandMoreIcon })} />
        }
      >
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.heading}>{element.name}</Typography>
          {level < levelCount - 1 && (
            <IconButton
              onClick={handleExpandCollapseSection(element, currentPath)}
              style={{ color: expanded[currentPath] ? 'white' : 'rgba(0, 0, 0, 0.54)' }}
            >
              {expandedSection[currentPath] ? (
                <BsArrowsCollapse fontSize="large" />
              ) : (
                <BsArrowsExpand fontSize="large" />
              )}
            </IconButton>
          )}
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {expanded[currentPath] && (
          <ChampionGrouping
            {...{
              grouping: element.children,
              path: currentPath,
              level: level + 1,
              levelCount,
            }}
          />
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

  return (
    <Grid item container direction="row" className={classes.groupingRoot}>
      {level === 0 ? (
        <ExpansionPanel key="ep-champions" element={grouping} path={path} />
      ) : (
        grouping.map(element =>
          level < levelCount ? (
            <ExpansionPanel
              key={`ep-${path}-${element.name}`}
              element={element}
              currentPath={`${path}.${element.name}`}
            />
          ) : (
            <ChampionCard key={element.uid} champion={element} />
          ),
        )
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
  iconButton: {
    color: 'white',
  },
}))

export default ChampionGrouping
