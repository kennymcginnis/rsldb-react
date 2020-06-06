import React from 'react'

export default function Defer(Component) {
  const Defer = props => {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    return <Component mounted={mounted} {...props} />
  }

  return Defer
}
