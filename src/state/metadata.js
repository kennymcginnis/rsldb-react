// import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { metadataState } from 'state/atoms'
import { metadata } from 'data/metadata'
import { createArrayMapByKey, createMapByKey } from 'util/functions'

const useMetadata = () => {
  const setMetadataState = useSetRecoilState(metadataState)
  const reducers = {
    setMetadataState: metadata => {
      const metadataMap = createMapByKey(metadata, 'uid')
      const metadataTypeMap = createArrayMapByKey(metadata, 'type')
      const newMetadata = { metadata, metadataMap, metadataTypeMap }
      setMetadataState(newMetadata)
      return newMetadata
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
