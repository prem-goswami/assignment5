import './index.css'

const SalaryRangeFilter = props => {
  const {salaryFilterDetails, setActiveSalaryFilterId} = props
  const {salaryRangeId, label} = salaryFilterDetails
  const onChangeSalaryFilter = () => {
    setActiveSalaryFilterId(salaryRangeId)
  }
  return (
    <li className="eachItem">
      <input
        type="checkbox"
        id={salaryRangeId}
        onChange={onChangeSalaryFilter}
      />
      <label htmlFor={salaryRangeId} className="labelText">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeFilter
