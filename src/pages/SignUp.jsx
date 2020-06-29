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

const SignUp = () => {
  const classes = useStyles()
  const [sent, setSent] = React.useState(false)

  const validate = values => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values)
    return validateEmail(errors, values)
  }

  const onSubmit = () => setSent(true)

  return (
    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        {'Sign Up'}
      </Typography>
      <Typography variant="body2" align="center">
        {'Already have an account? '}
        <Link to="/sign-in" underline="always">
          {'Sign in.'}
        </Link>
      </Typography>
      <Form {...{ onSubmit, validate }} subscription={{ submitting: true }}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Field
              autoComplete="handle"
              autoFocus
              component={RFTextField}
              fullWidth
              label="Handle"
              margin="normal"
              name="handle"
              required
              size="large"
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
              size="large"
            />
            <Field
              autoComplete="current-password"
              component={RFTextField}
              disabled={submitting || sent}
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
              disabled={submitting || sent}
              fullWidth
              size="large"
              style={{ width: '50%', left: '25%' }}
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
