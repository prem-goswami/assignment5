import './index.css'

const SkillsContainer = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skillsList">
      <div className="container">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default SkillsContainer
