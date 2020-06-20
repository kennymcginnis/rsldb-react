import React, { useState } from 'react'
import clsx from 'clsx'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MdExpansionPanel from '@material-ui/core/ExpansionPanel'
import Typography from '@material-ui/core/Typography'
// Icons
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// Components
import ChampionGrouping from 'components/champion/ChampionGrouping'
// State
import { useRecoilState } from 'recoil'
import { expandedState } from 'state/atoms'

const ExpansionPanel = ({ element, path }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = useRecoilState(expandedState)
  const handleExpandCollapse = name => (event, isExpanded) =>
    setExpanded({ ...expanded, [name]: isExpanded })

  const [expandedSection, setExpandedSection] = useState({})

  const expandCollapseChildren = ({ item, path, newExpanded, isExpanded }) => {
    item.children.forEach(child => {
      const childPath = `${path}.${child.name}`
      if (path === 'champions' && hasGrandchildren(item))
        expandCollapseChildren({ item: child, path: childPath, newExpanded, isExpanded })
      return (newExpanded[childPath] = isExpanded)
    })
  }

  const handleExpandCollapseSection = (item, path) => event => {
    event.stopPropagation()
    const isExpanded = !expandedSection[path]
    setExpandedSection(newExpandedSection => ({ ...newExpandedSection, [path]: isExpanded }))

    const newExpanded = { ...expanded, [path]: isExpanded }
    expandCollapseChildren({ item, newExpanded, path, isExpanded })
    setExpanded(newExpanded)
  }

  const hasGrandchildren = item => item?.children[0]?.children

  return (
    <MdExpansionPanel
      key={`${path}-${element.name}`}
      className={classes.expansionPanel}
      expanded={expanded[path] || false}
      onChange={handleExpandCollapse(path)}
    >
      <ExpansionPanelSummary
        {...(expanded[path] && { className: classes.expansionPanelSummary })}
        id={`eps-${path}`}
        color="secondary"
        expandIcon={
          <ExpandMoreIcon {...(expanded[path] && { className: classes.expandMoreIcon })} />
        }
      >
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography
            className={clsx(classes.heading, path === 'champions' ? classes.rootHeader : null)}
          >
            {element.name}
          </Typography>
          {hasGrandchildren(element) && (
            <IconButton
              onClick={e => handleExpandCollapseSection(element, path)(e)}
              style={{ color: expanded[path] ? 'white' : 'rgba(0, 0, 0, 0.54)' }}
            >
              {expandedSection[path] ? (
                <BsArrowsCollapse fontSize="large" />
              ) : (
                <BsArrowsExpand fontSize="large" />
              )}
            </IconButton>
          )}
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {expanded[path] && (
          <ChampionGrouping key={`${path}-${element.name}`} group={element.children} path={path} />
        )}
      </ExpansionPanelDetails>
    </MdExpansionPanel>
  )
}

const useStyles = makeStyles(theme => ({
  expansionPanel: {
    width: '100%',
  },
  expansionPanelSummary: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '4px 4px 0 0',
  },
  expandMoreIcon: {
    color: 'white',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  rootHeader: {
    fontSize: 20,
  },
}))

export default ExpansionPanel
