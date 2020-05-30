import axios from 'axios'
import { atom, useRecoilState } from 'recoil'
import { championData } from '../data/champions'

export const championsState = atom({
  key: 'champions',
  default: {
    champions: [],
    championMap: {},
    championNameMap: {},
  },
})

const useChampions = () => {
  const [localChampionState, setChampionState] = useRecoilState(championsState)

  const reducers = {
    setChampionState,
    createMapByKey: (array, key) => array.reduce((agg, obj) => ((agg[obj[key]] = obj), agg), {}), // eslint-disable-line no-sequences
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
    getChampion: uid => {
      return localChampionState.championMap[uid]
    },
  }

  return {
    state: localChampionState,
    reducers,
    effects: {
      fetchChampion: (key, { uid }) => {
        return Promise.resolve()
          .then(() => reducers.getChampion(uid))
          .catch(err => console.error('fetchChampion', err))
      },
      fetchChampions: () => {
        // axios
        //   .get('/champions')
        return Promise.resolve()
          .then(() => ({ data: championData }))
          .then(({ data }) => reducers.setChampions(data))
          .catch(err => console.error('fetchChampions', err))
      },
      createChampion: newChampion => {
        return axios
          .post(`/champion`, newChampion)
          .then(({ data }) => reducers.setChampion(data))
          .catch(err => console.error('createChampion', err))
      },
      updateChampion: newChampion => {
        return axios
          .post('/champion', newChampion)
          .then(({ data }) => reducers.setChampion(data))
          .catch(err => console.error('updateChampion', err))
      },
    },
  }
}

export default useChampions
