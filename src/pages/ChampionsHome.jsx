import React, { lazy } from 'react'
import 'components/bootstrap'
import { useRecoilValue } from 'recoil'
import { activeChampionState } from 'state/atoms'

// State
// Lazy components
const ChampionDetails = lazy(() => import('components/champion/ChampionDetails'))
const ChampionsIndex = lazy(() => import('components/champion/ChampionIndex'))

const ChampionsHome = () => {
  const { activeChampion } = useRecoilValue(activeChampionState)
  return (
    <>
      <h1>Champions</h1>
      {activeChampion ? <ChampionDetails /> : <ChampionsIndex />}
    </>
  )
}

export default ChampionsHome
