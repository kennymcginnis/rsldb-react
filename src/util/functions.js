export const createMapByKey = (array, key) =>
  array.reduce((agg, obj) => {
    agg[obj[key]] = obj
    return agg
  }, {})

export const createArrayMapByKey = (array, key) =>
  array.reduce((agg, obj) => {
    const type = obj[key]
    if (!agg[type]) agg[type] = []
    agg[type].push(obj)
    return agg
  }, {})
