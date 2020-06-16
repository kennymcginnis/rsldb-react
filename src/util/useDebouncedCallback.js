import debounce from 'lodash/debounce'
import { useMemo } from 'react'

export const useDebouncedCallback = (callback, wait) =>
  useMemo(() => debounce(callback, wait), [callback, wait])
