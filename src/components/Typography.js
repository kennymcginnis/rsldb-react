import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '@material-ui/core/utils'
import MuiTypography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const Typography = ({ children, marked = false, variant, ...other }) => {
  const classes = useStyles()

  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {marked ? (
        <span className={classes[`marked${capitalize(variant) + capitalize(marked)}`]} />
      ) : null}
    </MuiTypography>
  )
}

Typography.propTypes = {
  children: PropTypes.node,
  marked: PropTypes.oneOf([false, 'center', 'left']),
  variant: PropTypes.string,
}

const useStyles = makeStyles(theme => ({
  markedH2Center: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH3Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH4Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main,
  },
  markedH6Left: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor',
  },
}))

const variantMapping = {
  h1: 'h1',
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h3',
  h6: 'h2',
  subtitle1: 'h3',
}

export default Typography
