import React from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import '../components/bootstrap'
import Typography from '../components/Typography'

import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import RFTextField from '../form/RFTextField'
import { validateEmail, required } from '../form/validation'

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

const SignUp = () => {
  const classes = useStyles()
  const [sent, setSent] = React.useState(false)

  const validate = values => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values)
    return validateEmail(errors, values)
  }

  const handleSubmit = () => setSent(true)

  return (
    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Sign Up
      </Typography>
      <Typography variant="body2" align="center">
        <Link to="/login" underline="always">
          Already have an account?
        </Link>
      </Typography>
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
        {({ onSubmit, submitting }) => (
          <form {...{ onSubmit }} className={classes.form} noValidate>
            <Field
              autoFocus
              component={RFTextField}
              autoComplete="handle"
              fullWidth
              label="Handle"
              name="handle"
              required
            />
            <Field
              autoComplete="email"
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>
            <FormButton
              className={classes.button}
              disabled={submitting || sent}
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress…' : 'Sign Up'}
            </FormButton>
          </form>
        )}
      </Form>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}))

export default SignUp
