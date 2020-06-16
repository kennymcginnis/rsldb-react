import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// Layout
import Navbar from 'layout/Navbar'
import AuthRoute from 'layout/AuthRoute'
// Pages
import Champions from 'pages/ChampionsHome'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/champions" component={Champions} />
          <AuthRoute exact path="/login" component={SignIn} />
          <AuthRoute exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
