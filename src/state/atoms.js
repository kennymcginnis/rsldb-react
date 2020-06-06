import { atom, selector, selectorFamily } from 'recoil'

const authState = atom({
  key: 'auth',
  default: {
    authenticated: false,
    credentials: {},
  },
})

const metadataState = atom({
  key: 'metadata',
  default: {
    metadata: [],
    metadataMap: {},
    metadataTypeMap: {},
  },
})

const championsState = atom({
  key: 'champions',
  default: {
    champions: [],
    championMap: {},
  },
})

const championSelector = selectorFamily({
  key: 'championSelector',
  get: uid => ({ get }) => get(championsState).championMap[uid],
})

const activeChampionState = atom({
  key: 'filter',
  default: {},
})

const filtersState = atom({
  key: 'filter',
  default: {
    type: {},
    filtered: {},
    indeterminate: {},
  },
})

const filteredChampionsState = selector({
  key: 'filteredChampionsState',
  get: ({ get }) => {
    const filters = get(filtersState)
    const { champions } = get(championsState)
    return champions.filter(champion => {
      const { rarity, affinity, faction, role } = champion.attributes
      if (rarity && filters[rarity.uid] === false) return false
      if (affinity && filters[affinity.uid] === false) return false
      if (faction && filters[faction.uid] === false) return false
      if (role && filters[role.uid] === false) return false
      return true
    })
  },
})

const userState = atom({
  key: 'user',
  default: {
    champions: [],
  },
})

export {
  activeChampionState,
  authState,
  championSelector,
  championsState,
  filteredChampionsState,
  filtersState,
  metadataState,
  userState,
}
