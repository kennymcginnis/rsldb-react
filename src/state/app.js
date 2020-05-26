import { atom, useRecoilState } from 'recoil'
import axios from 'axios'

export const appState = atom({
  key: 'app',
  default: {
    errors: null,
  },
})

const useApp = () => {
  const [localAppState, setAppState] = useRecoilState(appState)

  const reducers = {
    setAppState,
    setLoading: type => setAppState({ ...localAppState, loading: type }),
    setErrors: (type, error, clear = false) => {
      console.error(error)
      if (clear) reducers.clearErrors()
      const errors = { ...localAppState.errors, [type]: error }
      return setAppState({ ...localAppState, errors })
    },
    clearErrors: () => setAppState({ ...localAppState, error: null }),
    setTimestamps: response => {
      const newAppState = { ...localAppState, ...response }
      setAppState(newAppState)
      return newAppState
    },
  }

  return {
    state: localAppState,
    reducers,
    effects: {
      fetchTimestamps: () =>
        axios
          .get('/timestamps')
          .then(res => reducers.setTimestamps(res.data))
          .catch(err => reducers.setErrors('fetchTimestamps', err)),
    },
  }
}

export default useApp
