import { Formik, Field, ErrorMessage, Form } from 'formik'
import { Upload } from '.././Utils/Files'

function PostForm(props) {
    return <Formik
    initialValues={{ name: props.record.title, description: '' }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(props.record.blob) // ---------------------------Posta här
      Upload(props.record, values)
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
        <input disabled={!dirty || isSubmitting || !isValid} type="submit" value="Save"/>
      </Form>
    )}
  </Formik>
}

export default PostForm