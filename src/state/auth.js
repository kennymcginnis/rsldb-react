import axios from 'axios'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import useUser from './user'

export const authState = atom({
  key: 'auth',
  default: {
    authenticated: false,
    credentials: {},
  },
})

const useAuth = () => {
  const user = useUser()
  const resetAuthState = useResetRecoilState(authState)
  const [localAuthState, setAuthState] = useRecoilState(authState)

  const reducers = {
    setAuthState,
    setAuthenticated: () =>
      setAuthState({
        ...localAuthState,
        authenticated: true,
      }),
    setUnauthenticated: () => resetAuthState(),
    loginFailed: () => resetAuthState(),
    loginSucceeded: (state, payload) => {
      if (payload.length === 0) {
        resetAuthState()
      } else {
        const { roles, groups } = payload[0]
        setAuthState({
          ...localAuthState,
          user: payload,
          isLoggedIn: true,
          roles: roles || [],
          groups: groups || [],
        })
      }
    },
    logout: () => resetAuthState(),
    setAuthorizationHeader: token => {
      history.push('/') // eslint-disable-line no-restricted-globals
      reducers.setAuthenticated()
      const FBIdToken = `Bearer ${token}`
      localStorage.setItem('FBIdToken', FBIdToken)
      axios.defaults.headers.common['Authorization'] = FBIdToken
    },
  }

  return {
    state: localAuthState,
    reducers,
    effects: {
      login: userData =>
        axios
          .post('/login', userData)
          .then(res => {
            reducers.setAuthorizationHeader(res.data.token)
            user.effects.getUsersChampions()
          })
          .catch(err => console.error('login', err)),
      signup: newUserData =>
        axios
          .post('/signup', newUserData)
          .then(res => reducers.setAuthorizationHeader(res.data.token))
          .catch(err => console.error('signup', err)),
      logout: () => {
        localStorage.removeItem('FBIdToken')
        delete axios.defaults.headers.common['Authorization']
        reducers.setUnauthenticated()
      },
    },
  }
}

export default useAuth
