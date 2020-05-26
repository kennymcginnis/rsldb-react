import React, { useState } from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../components/Typography'
import { validateEmail, required } from '../form/validation'
import RFTextField from '../form/RFTextField'
import FormButton from '../form/FormButton'
import FormFeedback from '../form/FormFeedback'
import { Link } from 'react-router-dom'

import useAuth from '../state/auth'
import { appState } from '../state/app'
import { useRecoilValue } from 'recoil'
import Grid from '@material-ui/core/Grid'

const SignIn = () => {
  const auth = useAuth()
  const classes = useStyles()

  const validate = values => {
    const errors = required(['email', 'password'], values)
    return validateEmail(errors, values)
  }

  const onSubmit = ({ email, password }) => auth.effects.login({ email, password })

  return (
    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Sign In
      </Typography>
      <Typography variant="body2" align="center">
        {'Not a member yet? '}
        <Link to="/signup" align="center" underline="always">
          Sign Up here!
        </Link>
      </Typography>
      <Form onSubmit={onSubmit} subscription={{ submitting: true }} validate={validate}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Field
              autoComplete="email"
              autoFocus
              component={RFTextField}
              disabled={submitting}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
              size="large"
            />
            <Field
              fullWidth
              size="large"
              component={RFTextField}
              disabled={submitting}
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
              disabled={submitting}
              size="large"
              color="secondary"
              fullWidth
            >
              {submitting ? 'In progress…' : 'Sign In'}
            </FormButton>
          </form>
        )}
      </Form>
      <Typography align="center">
        <Link to="/forgot-password" underline="always">
          Forgot password?
        </Link>
      </Typography>
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

export default SignIn
