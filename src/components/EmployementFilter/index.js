import './index.css'

const EmploymentFilter = props => {
  const {employeeDetails, setActiveEmployeeFilterId} = props
  const {label, employmentTypeId} = employeeDetails
  const checkBoxClicked = () => {
    setActiveEmployeeFilterId(employmentTypeId)
  }
  return (
    <li className="eachItem">
      <input type="checkbox" id={employeeDetails} onClick={checkBoxClicked} />
      <label htmlFor={employmentTypeId} className="labelText">
        {label}
      </label>
    </li>
  )
}

export default EmploymentFilter
