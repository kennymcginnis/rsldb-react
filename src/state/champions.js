import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
// State
import { championsState, metadataState } from 'state/atoms/index'
import { championData } from 'data/champions'
import { createMapByKey } from 'util/functions'

const useChampions = () => {
  const [localChampionState, setChampionState] = useRecoilState(championsState)

  const localMetadataState = useRecoilValue(metadataState)
  const { metadataMap } = localMetadataState

  const reducers = {
    enrichChampion: champion => {
      const output = { ...champion }
      if (metadataMap && champion.attributes) {
        Object.keys(champion.attributes).forEach(key => {
          const uid = champion.attributes[key]
          const element = metadataMap[uid]
          if (element) output.attributes[key] = element
        })
      }
      return output
    },
    updateChampion: input => {
      const champion = reducers.enrichChampion(input)
      const { champions, championMap } = localChampionState
      const newChampions = champions.filter(champ => champ.uid !== champion.uid).push(champion)
      championMap[champion.uid] = champion
      const newChampionState = { champions: newChampions, championMap }
      setChampionState(newChampionState)
      return newChampionState
    },
    setChampions: input => {
      const champions = input.map(champion => reducers.enrichChampion(champion))
      const championMap = createMapByKey(champions, 'uid')
      const newChampionState = { champions, championMap }
      setChampionState(newChampionState)
      return newChampionState
    },
    getChampion: uid => localChampionState.championMap[uid],
  }

  return {
    reducers,
    effects: {
      fetchChampion: (key, { uid }) => {
        return Promise.resolve()
          .then(() => reducers.getChampion(uid))
          .catch(err => console.error('fetchChampion', err))
      },
      fetchChampions: () => {
        return (
          // axios
          //   .get('/champions')
          Promise.resolve()
            .then(() => ({ data: championData }))
            .then(({ data }) => reducers.setChampions(data))
            .catch(err => console.error('fetchChampions', err))
        )
      },
      createChampion: newChampion => {
        return axios
          .post(`/champion`, newChampion)
          .then(({ data }) => reducers.updateChampion(data))
          .catch(err => console.error('createChampion', err))
      },
      updateChampion: newChampion => {
        return axios
          .post('/champion', newChampion)
          .then(({ data }) => reducers.updateChampion(data))
          .catch(err => console.error('updateChampion', err))
      },
    },
  }
}

export default useChampions
