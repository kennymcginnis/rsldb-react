import axios from 'axios'
import { atom, useSetRecoilState } from 'recoil'
import app from './app'

const metadataState = atom({
  key: 'metadata',
  default: {
    metadata: [],
    metadataMap: {},
  },
})

const useMetadata = () => {
  const setMetadataState = useSetRecoilState(metadataState)

  const reducers = {
    setMetadataState,
    setMetadata: metadata => {
      const metadataMap = metadata.reduce((agg, obj) => ((agg[obj.uid] = obj), agg), {})
      const newMetadata = { metadata, metadataMap }
      setMetadataState(newMetadata)
      return newMetadata
    },
  }
  const effects = {
    fetchMetadata: () =>
      axios
        .get('/metadata')
        .then(res => reducers.setMetadata(res.data))
        .catch(err => app.reducers.setErrors('loading', err)),
  }

  return {
    reducers,
    effects,
  }
}

export default useMetadata
