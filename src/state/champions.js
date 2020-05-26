import axios from 'axios'
import { atom, useRecoilState } from 'recoil'
import useApp from './app'

export const championsState = atom({
  key: 'champions',
  default: {
    champions: [],
    championMap: {},
    championNameMap: {},
  },
})

const useChampions = () => {
  const app = useApp()
  const [localChampionState, setChampionState] = useRecoilState(championsState)

  const reducers = {
    setChampionState,
    createMapByKey: (array, key) => array.reduce((agg, obj) => ((agg[obj[key]] = obj), agg), {}),
    setChampion: champion => {
      const { champions, championMap, championNameMap } = localChampionState
      const newChampions = champions.filter(champ => champ.uid !== champion.uid).push(champion)
      championMap[champion.uid] = champion
      championNameMap[champion.name] = champion
      const newChampionState = {
        ...localChampionState,
        champions: newChampions,
        championMap,
        championNameMap,
      }
      setChampionState(newChampionState)
      return newChampionState
    },
    setChampions: champions => {
      const championMap = reducers.createMapByKey(champions, 'uid')
      const championNameMap = reducers.createMapByKey(champions, 'name')
      const newChampionState = { ...localChampionState, champions, championMap, championNameMap }
      setChampionState(newChampionState)
      console.dir({ newChampionState })
      return newChampionState
    },
    getChampion: uid => localChampionState.championNameMap[uid],
  }

  return {
    state: localChampionState,
    reducers,
    effects: {
      fetchChampions: () =>
        axios
          .get('/champions')
          .then(res => reducers.setChampions(res.data))
          .catch(err => app.reducers.setErrors('fetchChampions', err)),
      createChampion: newChampion =>
        axios
          .post(`/champion`, newChampion)
          .then(res => reducers.setChampion(res.data))
          .catch(err => app.reducers.setErrors('createChampion', err)),
      updateChampion: newChampion =>
        axios
          .post('/champion', newChampion)
          .then(res => reducers.setChampion(res.data))
          .catch(err => app.reducers.setErrors('updateChampion', err)),
    },
  }
}

export default useChampions
