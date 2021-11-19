import { DropDownList } from '@progress/kendo-react-dropdowns'
import {
  Form,
  Field,
  FieldArray,
  FormElement,
} from '@progress/kendo-react-form'
import { Input } from '@progress/kendo-react-inputs'

import FormGrid from '../components/FormGrid'

export default function Deploy({ branches, installationId }) {
  const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2))

  return (
    <>
      <h2>Deploy App</h2>
      <Form
        initialValues={{
          environmentVariables: [],
        }}
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>
                Please fill in the fields
              </legend>
              <div className="field">
                <Field
                  name="branch"
                  component={DropDownList}
                  data={gitBranches}
                  textField="name"
                  label={'Select the branch to deploy'}
                />
              </div>
              <div className="field">
                <Field
                  name="sourceDirectory"
                  component={Input}
                  label={'Source Directory'}
                />
              </div>

              <div className="env">
                <span>Environment Variables</span>
                <FieldArray name="environmentVariables" component={FormGrid} />
              </div>
            </fieldset>
            <div className="k-form-buttons">
              <button
                type={'submit'}
                className="k-button"
                disabled={!formRenderProps.allowSubmit}
              >
                Submit
              </button>
            </div>
          </FormElement>
        )}
      />

      <style jsx>{`
        .field {
          width: 30rem;
        }

        .env {
          width: 60rem;
          padding-top: 1rem;
        }
      `}</style>
    </>
  )
}
