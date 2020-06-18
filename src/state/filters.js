import { useRecoilState } from 'recoil'
import { filtersState } from 'state/atoms/champions'
import useMetadata from 'state/metadata'
import { createFilterWithState } from 'util/functions'

const useFilters = () => {
  const [localFiltersState, setFiltersState] = useRecoilState(filtersState)
  const { getMetadataState } = useMetadata().reducers

  const reducers = {
    toggleIndeterminate: (filtered, filterType, items) => {
      const { type, indeterminate } = localFiltersState
      const allChecked = items.every(item => filtered[item.uid])
      const unchecked = items.every(item => !filtered[item.uid])
      setFiltersState(previous => ({
        ...previous,
        type: { ...type, [filterType]: allChecked },
        indeterminate: { ...indeterminate, [filterType]: !(allChecked || unchecked) },
      }))
    },
    handleTypeToggled: filterType => event => {
      const items = getMetadataState(filterType)
      const { type, filtered } = localFiltersState
      const updates = createFilterWithState(items, event.target.checked)
      setFiltersState(previous => ({
        ...previous,
        filtered: { ...filtered, ...updates },
        type: { ...type, [filterType]: event.target.checked },
        indeterminate: false,
      }))
    },
    handleFilterToggled: (uid, filterType) => () => {
      const items = getMetadataState(filterType)
      const { filtered } = localFiltersState
      const newState = filtered[uid] === false
      const newFiltered = { ...filtered, [uid]: newState }
      reducers.toggleIndeterminate(newFiltered, filterType, items)
    },
    handleFilterTypeOnly: (filterType, filter) => () => {
      const items = getMetadataState(filterType)
      const filtered = { ...localFiltersState.filtered }
      const type = { ...localFiltersState.type, [filterType]: false }
      const indeterminate = { ...localFiltersState.indeterminate, [filterType]: true }
      items.forEach(item => (filtered[item.uid] = item.uid === filter))
      setFiltersState(previous => ({ ...previous, filtered, type, indeterminate }))
    },
  }

  return {
    reducers,
  }
}

export default useFilters
