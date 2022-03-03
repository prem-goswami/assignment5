import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobCardDetails

  return (
    <li className="listItem">
      <Link to={`/jobs/${id}`} className="linkElement">
        <div className="header">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="descriptionContainer">
          <h1 className="descriptionHead">Description</h1>
          <p className="descriptionText">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
