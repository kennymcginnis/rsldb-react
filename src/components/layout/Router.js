import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// Components
import Navbar from './Navbar'
import AuthRoute from './AuthRoute'
// Pages
import Home from '../../pages/Home'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={SignIn} />
        <AuthRoute exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router
