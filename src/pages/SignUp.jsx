import React from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
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
        Sign Up
      </Typography>
      <Typography variant="body2" align="center">
        <Link to="/login" underline="always">
          Already have an account?
        </Link>
      </Typography>
      <Form {...{ onSubmit, validate }} subscription={{ submitting: true }}>
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
