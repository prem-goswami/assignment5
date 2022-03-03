import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    websiteUrl,
    employmentType,
    id,
    rating,
    title,
    location,
  } = similarJobDetails

  return (
    <li className="listItem">
      <div className="header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="companyLogo"
        />
        <div className="ratingsContainer">
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <div className="locationContainer">
        <div className="employmentType">
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
      <hr />
      <div className="descriptionContainer">
        <h1 className="descriptionHead">Description</h1>
      </div>
    </li>
  )
}

export default SimilarJobs
