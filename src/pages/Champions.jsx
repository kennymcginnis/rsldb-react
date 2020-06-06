import React, { lazy } from 'react'
import 'components/bootstrap'
import { useRecoilValue } from 'recoil'
// State
import { activeChampionState } from 'state/atoms'
// Lazy components
const Champion = lazy(() => import('components/champion/Champion'))
const Champions = lazy(() => import('components/champion/Champions'))

const ChampionsHome = () => {
  const activeChampion = useRecoilValue(activeChampionState)
  return (
    <>
      <h1>Champions</h1>
      {activeChampion ? <Champion /> : <Champions />}
    </>
  )
}

export default ChampionsHome
