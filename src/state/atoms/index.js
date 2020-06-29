import { atom, selector } from 'recoil'
import React from 'react'

export * from 'state/atoms/champions'

export const authState = atom({
  key: 'auth',
  default: {
    authenticated: false,
    credentials: {},
  },
})

export const navState = atom({
  key: 'nav',
  default: {
    selected: 0,
    routes: [
      '/champion-index',
      '/users-champions',
      '/dungeon-teams',
      '/faction-wars',
      '/clan-boss',
    ],
  },
})

export const titleState = selector({
  key: 'title',
  get: ({ get }) => {
    const { selected } = get(navState)
    const titles = [
      {
        md: 'Champion Index',
        sm: 'Index',
        xs: 'Index',
      },
      {
        md: "User's Champions",
        sm: 'Champions',
        xs: 'Champs',
      },
      {
        md: 'Dungeon Teams',
        sm: 'Dungeons',
        xs: 'Teams',
      },
      {
        md: 'Faction Wars',
        sm: 'Factions',
        xs: 'FW',
      },
      {
        md: 'Clan Boss',
        sm: 'ClanBoss',
        xs: 'CB',
      },
    ]
    return titles[selected]
  },
})

export const userState = atom({
  key: 'user',
  default: {
    champions: [],
  },
})

export const metadataState = atom({
  key: 'metadata',
  default: {
    metadata: [],
    metadataMap: {},
    metadataTypeMap: {},
  },
})
