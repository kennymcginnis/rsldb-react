import React, { Suspense, useEffect } from 'react'
import axios from 'axios'
// State
import useApp from '../../state/app'
import useMetadata from '../../state/metadata'
import useChampions from '../../state/champions'
import useAuth from '../../state/auth'
import jwtDecode from 'jwt-decode'

const Metadata = ({ children }) => {
  const app = useApp()
  const auth = useAuth()
  const metadata = useMetadata()
  const champions = useChampions()

  const { localMetadata, localChampions, FBIdToken: token } = localStorage
  const validateToken = () => {
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 >= Date.now()) {
        app.reducers.clearErrors()
        auth.reducers.setAuthenticated()
        axios.defaults.headers.common['Authorization'] = token
      } else {
        auth.reducers.logout()
        window.location.href = '/login'
      }
    }
  }

  const validateMetadata = async lastUpdated => {
    if (!localMetadata || localMetadata < lastUpdated) {
      const response = await metadata.effects.fetchMetadata()
      localStorage.setItem('localMetadata', lastUpdated)
      localStorage.setItem('metadata', JSON.stringify(response))
    } else {
      metadata.reducers.setMetadataState(JSON.parse(localStorage.metadata))
    }
  }
  const validateChampions = async lastUpdated => {
    if (!localChampions || localChampions < lastUpdated) {
      const response = await champions.effects.fetchChampions()
      localStorage.setItem('localChampions', lastUpdated)
      localStorage.setItem('champions', JSON.stringify(response))
    } else {
      champions.reducers.setChampionState(JSON.parse(localStorage.champions))
    }
  }

  validateToken()

  useEffect(() => {
    app.effects.fetchTimestamps().then(response => {
      const { metadata, champions } = response
      validateMetadata(metadata)
      validateChampions(champions)
    })
  }, [])

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}

export default Metadata
