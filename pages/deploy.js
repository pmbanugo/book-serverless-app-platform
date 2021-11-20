import { DropDownList } from '@progress/kendo-react-dropdowns'
import {
  Form,
  Field,
  FieldArray,
  FormElement,
} from '@progress/kendo-react-form'
import { Input } from '@progress/kendo-react-inputs'

import FormGrid from '../components/FormGrid'

import { useRouter } from 'next/router'
import { parse } from 'cookie'
import { App } from 'octokit'
import axios from 'axios'
import { generateSlug } from 'random-word-slugs'

export const getServerSideProps = async (context) => {
  const { repo, owner } = context.query
  const appId = process.env.APP_ID
  const privateKey = process.env.PRIVATE_KEY

  let branches = null
  let installationId = null

  if (owner && repo && appId && privateKey) {
    const app = new App({
      appId,
      privateKey,
    })
    const cookies = parse(context.req.headers?.cookie || '')
    installationId = cookies['installationId']

    branches = []
    const appOctokit = await app.getInstallationOctokit(installationId)
    const { data } = await appOctokit.rest.repos.listBranches({
      owner: owner,
      repo: repo,
    })

    branches = data.map((branch) => ({
      name: branch.name,
      commit: branch.commit.sha,
    }))
  }
  return {
    props: { branches, installationId },
  }
}

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
                  data={branches}
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
