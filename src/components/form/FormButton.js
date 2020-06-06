import React from 'react'
import PropTypes from 'prop-types'
// Components
import Button from 'components/Button'
import Defer from 'components/form/Defer'

const FormButton = props => {
  const { disabled, mounted, ...others } = props
  return <Button disabled={!mounted || disabled} type="submit" variant="contained" {...others} />
}

FormButton.propTypes = {
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
}

export default Defer(FormButton)
