import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import SkillsContainer from '../SkillsContainer'
import SimilarJobs from '../SimilarJobs'

class SpecificJobDetails extends Component {
  state = {
    eachJobDetails: [],
    similarJobsList: [],
    skillsList: [],
    lifeAtCompany: [],
    apiStatus: 'inProgress',
  }

  componentDidMount() {
    this.fetchEachJobDetails()
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  updateEachJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    websiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    description: data.life_at_company.description,
    imageUrl: data.life_at_company.image_url,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  updatedSimilarJobsData = data =>
    data.map(eachitem => ({
      companyLogoUrl: eachitem.company_logo_url,
      websiteUrl: eachitem.company_website_url,
      employmentType: eachitem.employment_type,
      id: eachitem.id,
      rating: eachitem.rating,
      title: eachitem.title,
      location: eachitem.location,
    }))

  fetchEachJobDetails = async () => {
    this.setState({
      apiStatus: 'inProgress',
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedSpecificData = this.updateEachJobDetails(
        fetchedData.job_details,
      )
      console.log(fetchedData.job_details.life_at_company)
      const updatedSkillsData = fetchedData.job_details.skills.map(
        eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        }),
      )
      const updatedLifeData = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      const updatedSimilarJobs = this.updatedSimilarJobsData(
        fetchedData.similar_jobs,
      )

      this.setState({
        eachJobDetails: updatedSpecificData,
        similarJobsList: updatedSimilarJobs,
        skillsList: updatedSkillsData,
        lifeAtCompany: updatedLifeData,
        apiStatus: 'success',
      })
    } else {
      this.setState({
        apiStatus: 'failure',
      })
    }
  }

  onClickRetry = () => {
    this.fetchEachJobDetails()
  }

  renderFailureView = () => (
    <div className="failureView">
      <h1>Oops! Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  onClickVisit = () => {
    const {websiteUrl} = this.state
    return <Redirect to={websiteUrl} />
  }

  renderJobDetails = () => {
    const {eachJobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      packagePerAnnum,
      employmentType,
      description,
      websiteUrl,
    } = eachJobDetails
    return (
      <>
        <div className="header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job details company logo"
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
        <hr className="line" />
        <div className="descriptionContainer">
          <div>
            <h1 className="descriptionHead">Description</h1>
            <a href={websiteUrl}>Visit</a>
          </div>

          <p className="descriptionText">{description}</p>
        </div>
      </>
    )
  }

  renderSkillDetails = () => {
    const {skillsList} = this.state
    return (
      <ul className="skillsContainer">
        {skillsList.map(eachitem => (
          <SkillsContainer skillDetails={eachitem} key={eachitem.name} />
        ))}
      </ul>
    )
  }

  renderSimilarJobsContainer = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="similarJobsContainer">
        {similarJobsList.map(eachitem => (
          <SimilarJobs similarJobDetails={eachitem} key={eachitem.id} />
        ))}
      </ul>
    )
  }

  renderLifeAtCompanyDetails = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <ul className="listLifeAtCompany">
        <div className="container">
          <img src={imageUrl} alt="life at company" />
          <p>{description}</p>
        </div>
      </ul>
    )
  }

  renderSuccessView = () => (
    <div>
      {this.renderJobDetails()}
      <h1 className="skillsText">Skills</h1>
      {this.renderSkillDetails()}
      <h1>Life at Company</h1>
      <h1 className="skillsText">Similar Jobs</h1>
      {this.renderSimilarJobsContainer()}
      {this.renderLifeAtCompanyDetails()}
    </div>
  )

  renderResultContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'inProgress':
        return this.renderLoadingView()
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <Header />
        <div className="jobDetailsContainer">
          {this.renderResultContainer()}
        </div>
      </div>
    )
  }
}

export default SpecificJobDetails
