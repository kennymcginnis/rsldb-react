import React from 'react'
import axios from 'axios'
import Router from 'layout/Router'
import { useQuery } from 'react-query'
import { ReactQueryConfigProvider } from 'react-query'
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
// Styles
import 'App.css'
import theme from 'styles/theme'
// State
import { RecoilRoot, useRecoilValue } from 'recoil'
import useMetadata from 'state/metadata'
import useChampions from 'state/champions'
import useAuth from './state/auth'
import jwtDecode from 'jwt-decode'
import { authState } from './state/atoms'
import useUser from './state/user'

axios.defaults.baseURL = 'http://localhost:5000/rsl-db/us-central1/api/'

const queryConfig = {
  suspense: true,
  staleTime: 1000 * 60 * 5,
}

const MetadataLoader = ({ children }) => {
  const auth = useAuth()
  const user = useUser()
  const data = useMetadata()
  const champ = useChampions()
  const { authenticated } = useRecoilValue(authState)

  const token = localStorage.FBIdToken
  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
      auth.effects.logout()
      window.location.href = '/sign-in'
    } else {
      auth.reducers.setAuthenticated()
      axios.defaults.headers.common['Authorization'] = token
    }
  }

  const { data: metadata } = useQuery('metadata', data.effects.fetchMetadata)
  const { data: champions } = useQuery(metadata && 'champions', champ.effects.fetchChampions)
  useQuery(authenticated && 'users_champions', user.effects.getUsersChampions)

  return champions ? children : null
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <RecoilRoot>
      <ReactQueryConfigProvider config={queryConfig}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MetadataLoader>
            <Router />
          </MetadataLoader>
        </React.Suspense>
      </ReactQueryConfigProvider>
    </RecoilRoot>
  </MuiThemeProvider>
)

export default App
