import { atom, selector } from 'recoil'
import getByPath from 'lodash/get'
import setByPath from 'lodash/set'
import { defaultFilterState } from 'data/metadata'

export const activeChampionState = atom({
  key: 'activeChampion',
  default: { activeChampion: '' },
})

export const championSelector = selector({
  key: 'championSelector',
  get: ({ get }) => {
    const { championMap } = get(championsState)
    const { activeChampion } = get(activeChampionState)
    return championMap[activeChampion]
  },
})

export const championsState = atom({
  key: 'champions',
  default: {
    champions: [],
    championMap: {},
  },
})

export const filtersState = atom({
  key: 'filters',
  default: defaultFilterState,
})

export const groupingState = atom({
  key: 'grouping',
  default: [
    { order: 1, type: 'faction' },
    { order: 2, type: 'rarity' },
    { order: 0, type: 'affinity' },
  ],
})

export const expandedState = atom({
  key: 'expanded',
  default: { champions: true },
})

export const selectedState = atom({
  key: 'selected',
  default: {},
})

export const championsDisplay = selector({
  key: 'championsDisplay',
  get: ({ get }) => {
    const { filtered, searched } = get(filtersState)
    const { champions } = get(championsState)

    const [...original] = get(groupingState)
    const groupings = original
      .filter(a => a.order > 0)
      .sort((a, b) => a.order - b.order)
      .map(a => a.type)

    // will return true if the champion should be filtered out of the results
    const isFiltered = champion => {
      if (searched && !champion.name.toLowerCase().includes(searched.toLowerCase())) return true

      const { rarity, affinity, faction, role } = champion.attributes
      if (rarity && filtered[rarity.uid] === false) return true
      if (affinity && filtered[affinity.uid] === false) return true
      if (faction && filtered[faction.uid] === false) return true
      if (role && filtered[role.uid] === false) return true
      return !(rarity && affinity && faction)
    }

    let output = { name: 'Champions', children: [] }
    champions.forEach(champion => {
      if (isFiltered(champion)) return
      const { attributes } = champion
      if (groupings.length === 0) {
        output.children.push(champion)
      } else {
        let currentPath = ['children']
        groupings.forEach(grouping => {
          const { name, order } = attributes[grouping]
          currentPath.push(order - 1)
          setByPath(output, [...currentPath, 'name'], name)
          currentPath.push('children')
        })
        const lastIndex = (getByPath(output, currentPath) || []).length
        setByPath(output, [...currentPath, lastIndex], champion)
      }
    })
    return output
  },
})
