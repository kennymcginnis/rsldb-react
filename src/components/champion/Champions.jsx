import React from 'react'
import { useQuery } from 'react-query'
// Components
import Button from '../Button'
import Spinner from './../Spinner'
// State
import useChampions from '../../state/champions'

export default function Champions({ setActiveChampion }) {
  const champ = useChampions()
  const { data, isFetching } = useQuery('champions', champ.effects.fetchChampions)

  return (
    <div>
      <h1>Champions {isFetching && <Spinner />}</h1>
      {data.champions.map(champion => (
        <p key={champion.uid}>
          <Button
            onClick={() => {
              // Prefetch the champion query
              // queryCache.prefetchQuery(['champion', { id: champion.name }], fetchChampion)
              setActiveChampion(champion.uid)
            }}
          >
            Load
          </Button>{' '}
          {champion.name}
        </p>
      ))}
    </div>
  )
}
