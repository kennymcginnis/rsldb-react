import React, { useState } from 'react'
import clsx from 'clsx'
// MUI
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
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

  const isChampionsRoot = path === 'champions'
  const hasGrandchildren = item => item?.children?.[0]?.children

  const expandCollapseChildren = ({ item, path, newExpanded, isExpanded }) => {
    item.children.forEach(child => {
      const childPath = `${path}.${child.name}`
      if (isChampionsRoot && hasGrandchildren(item))
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

  return isChampionsRoot ? (
    <Card key={`${path}-${element.name}`} className={classes.rootContainer}>
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.rootHeader}>{element.name}</Typography>
          <IconButton
            onClick={e => handleExpandCollapseSection(element, path)(e)}
            style={{ color: 'white' }}
          >
            {expandedSection[path] ? (
              <BsArrowsCollapse fontSize="large" />
            ) : (
              <BsArrowsExpand fontSize="large" />
            )}
          </IconButton>
        </Grid>
      </CardContent>
      <ChampionGrouping key={`${path}-${element.name}`} group={element.children} path={path} />
    </Card>
  ) : (
    <StyledExpansionPanel
      key={`${path}-${element.name}`}
      expanded={expanded[path] || false}
      onChange={handleExpandCollapse(path)}
      TransitionProps={{ unmountOnExit: true }}
    >
      <StyledExpansionPanelSummary
        id={`eps-${path}`}
        color="secondary"
        classes={{
          content: classes.expansionPanelSummaryContent,
        }}
        expandIcon={<ExpandMoreIcon {...(expanded[path] && { className: classes.white })} />}
      >
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Typography className={classes.heading}>{element.name}</Typography>
          {hasGrandchildren(element) && (
            <IconButton
              onClick={e => handleExpandCollapseSection(element, path)(e)}
              {...(expanded[path] && { className: classes.white })}
            >
              {expandedSection[path] ? (
                <BsArrowsCollapse fontSize="large" />
              ) : (
                <BsArrowsExpand fontSize="large" />
              )}
            </IconButton>
          )}
        </Grid>
      </StyledExpansionPanelSummary>
      <MuiExpansionPanelDetails className={classes.noPadding}>
        {expanded[path] && (
          <ChampionGrouping key={`${path}-${element.name}`} group={element.children} path={path} />
        )}
      </MuiExpansionPanelDetails>
    </StyledExpansionPanel>
  )
}

const useStyles = makeStyles(theme => ({
  rootContainer: {
    width: '100%',
    margin: 0,
  },
  cardContent: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '4px 4px 0 0',
    margin: 0,
    marginBottom: 8,
  },
  rootHeader: {
    fontSize: 20,
  },
  expansionPanelSummary: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '4px 4px 0 0',
  },
  white: {
    color: 'white',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  noMargin: {
    margin: 0,
  },
  noPadding: {
    padding: 0,
  },
}))

const StyledExpansionPanel = withStyles({
  root: {
    width: '100%',
    margin: 0,
    '&$expanded': {
      margin: 8,
    },
  },
  expanded: {
    // borderBottom: 8,
  },
})(MuiExpansionPanel)

const StyledExpansionPanelSummary = withStyles(theme => ({
  root: {
    '&$expanded': {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '4px 4px 0 0',
    },
  },
  expanded: {
    marginBottom: 8,
  },
}))(MuiExpansionPanelSummary)

export default ExpansionPanel
