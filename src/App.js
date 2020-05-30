import React from 'react'
import axios from 'axios'
// Styles
import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import { RecoilRoot } from 'recoil'
import Router from './components/layout/Router'
import { ReactQueryConfigProvider } from 'react-query'

axios.defaults.baseURL = 'http://localhost:5000/rsl-db/us-central1/api/'

const queryConfig = {
  suspense: true,
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <RecoilRoot>
        <ReactQueryConfigProvider config={queryConfig}>
          <Router />
        </ReactQueryConfigProvider>
      </RecoilRoot>
    </MuiThemeProvider>
  )
}

export default App
