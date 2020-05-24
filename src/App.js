import React from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
// Styles
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
// State
import { RecoilRoot } from 'recoil'
import Metadata from './components/layout/Metadata'
import Router from './components/layout/Router'

axios.defaults.baseURL = 'http://localhost:5000/rsl-db/us-central1/api/'

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <RecoilRoot>
        <Metadata>
          <Router />
        </Metadata>
      </RecoilRoot>
    </MuiThemeProvider>
  )
}

export default App
