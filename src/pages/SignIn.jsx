import React from 'react'
import { Link } from 'react-router-dom'
import { Field, Form, FormSpy } from 'react-final-form'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import 'components/bootstrap'
import { required, validateEmail } from 'components/form/validation'
import FormButton from 'components/form/FormButton'
import FormFeedback from 'components/form/FormFeedback'
import RFTextField from 'components/form/RFTextField'
import Typography from 'components/Typography'
// State
import useAuth from 'state/auth'

const SignIn = () => {
  const auth = useAuth()
  const classes = useStyles()

  const validate = values => {
    const errors = required(['email', 'password'], values)
    return validateEmail(errors, values)
  }

  const onSubmit = ({ email, password }) => auth.effects.signin({ email, password })

  return (
    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        {'Sign In'}
      </Typography>
      <Typography variant="body2" align="center">
        {'Not a member yet? '}
        <Link to="/sign-up" align="center" underline="always">
          {'Sign up here!'}
        </Link>
      </Typography>
      <Form {...{ onSubmit, validate }} subscription={{ submitting: true }}>
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
              autoComplete="current-password"
              component={RFTextField}
              disabled={submitting}
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              required
              size="large"
              type="password"
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
              color="secondary"
              disabled={submitting}
              fullWidth
              size="large"
              style={{ width: '50%', left: '25%' }}
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
