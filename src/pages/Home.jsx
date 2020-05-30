import React, { lazy } from 'react'
import '../components/bootstrap'
import { queryCache } from 'react-query'
// Components
import Button from '../components/Button'
import ErrorBoundary from '../components/ErrorBoundary'
// State
import useChampions from '../state/champions'

const Champion = lazy(() => import('../components/champion/Champion'))
const Champions = lazy(() => import('../components/champion/Champions'))

const Home = () => {
  const champ = useChampions()
  const [showChampions, setShowChampions] = React.useState(false)
  const [activeChampion, setActiveChampion] = React.useState(null)

  const handleClick = () =>
    setShowChampions(old => {
      if (!old) queryCache.prefetchQuery('champions', champ.effects.fetchChampions)
      return !old
    })

  return (
    <>
      {!activeChampion && (
        <>
          <Button onClick={handleClick}>{`${showChampions ? 'Hide' : 'Show'} Champions`}</Button>
          <hr />
        </>
      )}
      <ErrorBoundary>
        <React.Suspense fallback={<h1>Loading champions...</h1>}>
          {showChampions &&
            (activeChampion ? (
              <Champion {...{ activeChampion, setActiveChampion }} />
            ) : (
              <Champions {...{ setActiveChampion }} />
            ))}
        </React.Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Home
