import { createContext, useContext, useCallback } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { Field } from '@progress/kendo-react-form'

const ParentFieldContext = createContext('')
const FORM_DATA_INDEX = 'formDataIndex'

const inputCell = (props) => {
  const parentField = useContext(ParentFieldContext)
  return (
    <td>
      <Field
        component={Input}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
      />
    </td>
  )
}

const commandCell = (onRemove) => (props) => {
  const onClick = useCallback(
    (e) => {
      e.preventDefault()
      onRemove(props)
    },
    [props]
  )
  return (
    <td>
      <button className="k-button k-grid-remove-command" onClick={onClick}>
        Remove
      </button>
    </td>
  )
}

const FormGrid = (fieldArrayRenderProps) => {
  const { validationMessage, visited, name } = fieldArrayRenderProps
  const onAdd = useCallback(
    (e) => {
      e.preventDefault()
      fieldArrayRenderProps.onUnshift({
        value: {
          key: '',
          value: '',
        },
      })
    },
    [fieldArrayRenderProps]
  )
  const onRemove = useCallback(
    (cellProps) =>
      fieldArrayRenderProps.onRemove({
        index: cellProps.dataIndex,
      }),
    [fieldArrayRenderProps]
  )
  const dataWithIndexes = fieldArrayRenderProps.value.map((item, index) => {
    return { ...item, [FORM_DATA_INDEX]: index }
  })

  return (
    <ParentFieldContext.Provider value={name}>
      {visited && validationMessage && <Error>{validationMessage}</Error>}
      <Grid data={dataWithIndexes}>
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-primary"
            onClick={onAdd}
          >
            Add new
          </button>
        </GridToolbar>
        <GridColumn field="key" title="Key" cell={inputCell} />
        <GridColumn field="value" title="Value" cell={inputCell} />
        <GridColumn cell={commandCell(onRemove)} width="240px" />
      </Grid>
    </ParentFieldContext.Provider>
  )
}

export default FormGrid
