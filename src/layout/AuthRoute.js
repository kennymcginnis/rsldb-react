import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticated ? <Redirect to="/" /> : <Component {...props} />)}
  />
)

AuthRoute.propTypes = {
  user: PropTypes.object,
}

export default AuthRoute
