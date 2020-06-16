import { atom } from 'recoil'

export * from 'state/atoms/champions'

export const authState = atom({
  key: 'auth',
  default: {
    authenticated: false,
    credentials: {},
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
