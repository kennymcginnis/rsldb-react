import isEmail from 'validator/lib/isEmail'

export const validateEmail = (errors, { email }) => {
  if (!errors.email) {
    const emailError = email && !isEmail(email.trim()) ? 'Invalid email' : null
    if (emailError) errors.email = emailError
  }
  return errors
}

const isDirty = value => value || value === 0

export const required = (requiredFields, values) =>
  requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: 'Required' }),
    }),
    {},
  )
