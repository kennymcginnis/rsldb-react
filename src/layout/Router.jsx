import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// Layout
import Navbar from 'layout/Navbar'
import AuthRoute from 'layout/AuthRoute'
// Pages
import Champions from 'pages/ChampionsHome'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import BottomNavigation from './BottomNavigation'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/champion-index" component={Champions} />
          <AuthRoute exact path="/sign-in" component={SignIn} />
          <AuthRoute exact path="/sign-up" component={SignUp} />
        </Switch>
      </div>
      <BottomNavigation />
    </BrowserRouter>
  )
}

export default Router
