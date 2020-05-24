import axios from 'axios'
import { atom, useRecoilState } from 'recoil'
import useApp from './app'

export const userState = atom({
  key: 'user',
  default: {
    champions: [],
    championsMap: [],
  },
})

const useUser = () => {
  const [localUserState, setUserState] = useRecoilState(userState)

  const app = useApp()
  const reducers = {
    setUser: user => ({ ...localUserState, user }),
    setUsersChampions: champions => {
      const championMap = champions.reduce((agg, obj) => ((agg[obj.uid] = obj), agg), {})
      setUserState({ ...localUserState, champions, championMap })
    },
    pullChampion: champion => {
      const { champions, championMap } = localUserState
      champions.push(champion)
      championMap[champion.uid] = champion
      setUserState({ ...localUserState, champions, championMap })
    },
    updateUserChampions: (response, action) => {
      const { championMap } = localUserState
      Object.keys(response)
        .filter(uid => response[uid] === 'success')
        .forEach(uid => {
          switch (action) {
            case 'feed':
              delete championMap[uid]
              break
            case 'ascend':
              championMap[uid].ascension = ++championMap[uid].ascension || 1
              break
            case 'rank':
              championMap[uid].rank = ++championMap[uid].rank
              break
          }
        })
      const champions = Object.values(championMap)
      setUserState({ ...localUserState, champions, championMap })
    },
  }
  const effects = {
    getUsersChampions: () =>
      axios
        .get('/users/champions')
        .then(res => reducers.setUsersChampions(res.data))
        .catch(err => app.reducers.setErrors('fetchUsersChampions', err)),
    pullChampion: championId =>
      axios
        .get(`/users/champions/${championId}`)
        .then(res => reducers.pullChampion(res.data))
        .catch(err => app.reducers.setErrors('pullChampion', err)),
    updateUserChampions: (uids, action) =>
      axios
        .put(`/users/champions/${action}`, uids)
        .then(res => reducers.updateUserChampions(res.data, action))
        .catch(err => app.reducers.setErrors('updateUserChampions', err)),
  }

  return {
    reducers,
    effects,
  }
}

export default useUser
