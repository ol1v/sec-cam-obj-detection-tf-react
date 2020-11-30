import { Formik, Field, ErrorMessage, Form } from 'formik'

function PostForm() {
    return <Formik
    initialValues={{ name: '', description: '' }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false)
      }, 1000)
    }}
    validate={(values) => {
      const errors = {}

      if (values.name.trim() === '') {
        errors.name = 'Provide a name'
      }

      if (values.description.trim() === '') {
        errors.description = 'Add a description'
      }

      return errors
    }}
  >
    {({ dirty, isSubmitting, isValid }) => (
      <Form>
        <label>
          name
          <Field name="name" />
        </label>
        <ErrorMessage component="span" name="name" />
        <label>
          description
          <Field name="description" />
        </label>
        <ErrorMessage component="span" name="description" />
        <input disabled={!dirty || isSubmitting || !isValid} type="submit" />
      </Form>
    )}
  </Formik>
}

export default PostForm