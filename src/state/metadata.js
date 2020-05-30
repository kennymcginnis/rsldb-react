import axios from 'axios'
import { atom, useRecoilState } from 'recoil'
import app from './app'

const metadataState = atom({
  key: 'metadata',
  default: {
    metadata: [],
    metadataMap: {},
  },
})

const useMetadata = () => {
  const [localMetadataState, setMetadataState] = useRecoilState(metadataState)

  const reducers = {
    setMetadataState,
    setMetadata: metadata => {
      const metadataMap = metadata.reduce((agg, obj) => ((agg[obj.uid] = obj), agg), {})
      const newMetadata = { metadata, metadataMap }
      setMetadataState(newMetadata)
      return newMetadata
    },
  }

  return {
    state: localMetadataState,
    reducers,
    effects: {
      fetchMetadata: () =>
        axios
          .get('/metadata')
          .then(res => reducers.setMetadata(res.data))
          .catch(err => console.error('loading', err)),
    },
  }
}

export default useMetadata
