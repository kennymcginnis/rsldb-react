import React from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// Components
import 'components/bootstrap'
import { validateEmail, required } from 'components/form/validation'
import FormButton from 'components/form/FormButton'
import FormFeedback from 'components/form/FormFeedback'
import RFTextField from 'components/form/RFTextField'
import Typography from 'components/Typography'

const ForgotPassword = () => {
  const classes = useStyles()
  const [sent, setSent] = React.useState(false)

  const validate = values => {
    const errors = required(['email', 'password'], values)
    return validateEmail(errors, values)
  }

  const onSubmit = () => setSent(true)

  return (
    <Grid item xs={12} sm={6} style={{ margin: 'auto' }}>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Forgot your password?
      </Typography>
      <Typography variant="body2" align="center">
        {"Enter your email address below and we'll " + 'send you a link to reset your password.'}
      </Typography>
      <Form {...{ onSubmit, validate }} subscription={{ submitting: true }}>
        {({ handleSubmit2, submitting }) => (
          <form onSubmit={handleSubmit2} className={classes.form} noValidate>
            <Field
              autoFocus
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
              size="large"
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress…' : 'Send reset link'}
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

export default ForgotPassword
