import React from 'react'
import axios from 'axios'
import Router from 'layout/Router'
import theme from 'styles/theme'
import { useQuery } from 'react-query'
import { ReactQueryConfigProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
//
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
// Styles
import 'App.css'
// State
import useMetadata from 'state/metadata'
import useChampions from 'state/champions'

axios.defaults.baseURL = 'http://localhost:5000/rsl-db/us-central1/api/'

const queryConfig = {
  suspense: true,
}

const MetadataLoader = ({ children }) => {
  const data = useMetadata()
  const champ = useChampions()

  const { data: metadata } = useQuery('metadata', data.effects.fetchMetadata)
  const { data: champions } = useQuery(metadata && 'champions', champ.effects.fetchChampions)

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
