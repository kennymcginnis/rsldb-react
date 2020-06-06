import { useRecoilState } from 'recoil'
import { filtersState } from 'state/atoms'
import { createFilterWithState } from 'util/functions'

const useFilters = () => {
  const [localFilterState, setFilterState] = useRecoilState(filtersState)

  const reducers = {
    toggleIndeterminate: (filtered, filterType, items) => {
      const { type, indeterminate } = localFilterState
      const allChecked = items.every(item => filtered[item.uid])
      const unchecked = items.every(item => !filtered[item.uid])
      setFilterState({
        ...filtered,
        type: { ...type, [filterType]: allChecked },
        indeterminate: { ...indeterminate, [filterType]: !(allChecked || unchecked) },
      })
    },
    handleTypeToggled: (filterType, items) => event => {
      const { type, filtered } = localFilterState
      const updates = createFilterWithState(items, event.target.checked)
      setFilterState({
        filtered: { ...filtered, ...updates },
        type: { ...type, [filterType]: event.target.checked },
        indeterminate: false,
      })
    },
    handleFilterToggled: (uid, filterType, items) => () => {
      const { filtered } = localFilterState
      const newState = filtered[uid] === false
      const newFiltered = { ...filtered, [uid]: newState }
      reducers.toggleIndeterminate(newFiltered, filterType, items)
    },
  }

  return {
    reducers,
  }
}

export default useFilters
