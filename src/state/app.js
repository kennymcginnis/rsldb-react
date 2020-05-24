import { atom, useRecoilState } from 'recoil'
import axios from 'axios'

export const appState = atom({
  key: 'app',
  default: {
    errors: null,
  },
})

const useApp = () => {
  const [appData, setAppState] = useRecoilState(appState)

  const reducers = {
    setErrors: (type, error, clear = false) => {
      console.error(error)
      if (clear) reducers.clearErrors()
      const errors = { ...appData.errors, [type]: error }
      return setAppState({ ...appData, errors })
    },
    clearErrors: () => setAppState({ ...appData, error: null }),
    setTimestamps: response => {
      const newAppState = { ...appData, ...response }
      setAppState(newAppState)
      return newAppState
    },
  }

  const effects = {
    fetchTimestamps: () =>
      axios
        .get('/timestamps')
        .then(res => reducers.setTimestamps(res.data))
        .catch(err => reducers.setErrors('fetchTimestamps', err)),
  }
  return {
    reducers,
    effects,
  }
}

export default useApp
