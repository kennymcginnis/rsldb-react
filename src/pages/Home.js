import '../components/bootstrap'
// --- Post bootstrap -----
import React from 'react'
import useMetadata from '../state/metadata'
import useChampions from '../state/champions'
import useUser from '../state/user'

const Home = () => {
  const user = useUser()
  const metadata = useMetadata()
  const champions = useChampions()

  const { metadataMap } = metadata.state
  const { championMap } = champions.state
  const { champions: usersChampions } = user.state

  return (
    <>
      {usersChampions.map(uc => (
        <div>{uc.champion}</div>
      ))}
    </>
  )
}

export default Home
