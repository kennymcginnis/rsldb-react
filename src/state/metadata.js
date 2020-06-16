// import axios from 'axios'
import { useRecoilState } from 'recoil'
import { metadataState } from 'state/atoms/index'
import { metadata } from 'data/metadata'
import { createArrayMapByKey, createMapByKey } from 'util/functions'

const useMetadata = () => {
  const [localMetadataState, setMetadataState] = useRecoilState(metadataState)
  const reducers = {
    setMetadataState: metadata => {
      const metadataMap = createMapByKey(metadata, 'uid')
      const metadataTypeMap = createArrayMapByKey(metadata, 'type')
      const newMetadata = { metadata, metadataMap, metadataTypeMap }
      setMetadataState(newMetadata)
      return newMetadata
    },
    getMetadataState: type => {
      const { metadata, metadataTypeMap } = localMetadataState
      const output = { metadata, ...metadataTypeMap }
      return type ? output[type.toLowerCase()] : output
    },
  }

  return {
    reducers,
    effects: {
      fetchMetadata: () =>
        Promise.resolve()
          .then(() => ({ data: metadata }))
          // axios
          //   .get('/metadata')
          .then(res => reducers.setMetadataState(res.data))
          .catch(err => console.error('loading', err)),
    },
  }
}

export default useMetadata
