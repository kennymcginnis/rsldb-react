import axios from 'axios'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { authState } from 'state/atoms'
import { useHistory } from 'react-router-dom'

const useAuth = () => {
  const history = useHistory()
  const resetAuthState = useResetRecoilState(authState)
  const [localAuthState, setAuthState] = useRecoilState(authState)

  const reducers = {
    setAuthenticated: () =>
      setAuthState({
        ...localAuthState,
        authenticated: true,
      }),
    signinSucceeded: (state, payload) => {
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
    setAuthorizationHeader: token => {
      reducers.setAuthenticated()
      const FBIdToken = `Bearer ${token}`
      localStorage.setItem('FBIdToken', FBIdToken)
      axios.defaults.headers.common['Authorization'] = FBIdToken
    },
  }

  return {
    reducers,
    effects: {
      signin: userData =>
        axios
          .post('/login', userData)
          .then(res => {
            history.push('/') // eslint-disable-line no-restricted-globals
            reducers.setAuthorizationHeader(res.data.token)
          })
          .catch(err => console.error('login', err)),
      signup: newUserData =>
        axios
          .post('/signup', newUserData)
          .then(res => {
            history.push('/') // eslint-disable-line no-restricted-globals
            reducers.setAuthorizationHeader(res.data.token)
          })
          .catch(err => console.error('signup', err)),
      logout: () => {
        localStorage.removeItem('FBIdToken')
        delete axios.defaults.headers.common['Authorization']
        resetAuthState()
      },
    },
  }
}

export default useAuth
