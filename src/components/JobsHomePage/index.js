import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import EmploymentFilter from '../EmployementFilter'
import SalaryRangeFilter from '../SalaryRangeFilter'
import JobCard from '../jobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsHomePage extends Component {
  state = {
    profileDetails: [],
    jobDetails: [],
    activeEmployeeFilterId: '',
    activeSalaryFilterId: '',
    apiStatus: 'inProgress',
    searchInput: '',
  }

  componentDidMount() {
    this.fetchJobsDetails()
    this.fetchProfileDetails()
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  fetchProfileDetails = async () => {
    this.setState({apiStatus: 'inprogress'})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileDetails: updatedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
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

  onClickRetry = () => {
    this.fetchJobsDetails()
  }

  setActiveEmployeeFilterId = employmentTypeId => {
    this.setState(
      {activeEmployeeFilterId: employmentTypeId},
      this.fetchJobsDetails,
    )
  }

  renderFinalProfileContainer = () => {
    const {apiStatus} = this.state

    if (apiStatus === 'success') {
      return this.renderProfileContainer()
    }
    return this.renderFailureView()
  }

  setActiveSalaryFilterId = salaryRangeId => {
    this.setState({activeSalaryFilterId: salaryRangeId}, this.fetchJobsDetails)
  }

  renderProfileContainer = () => {
    const {profileDetails} = this.state
    const {profileImage, name, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImage} alt="profile" />
        <h1 className="nameText">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  fetchJobsDetails = async () => {
    this.setState({
      apiStatus: 'inProgress',
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmployeeFilterId,
      activeSalaryFilterId,
      searchInput,
    } = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeFilterId}&minimum_package=${activeSalaryFilterId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const jobsData = await response.json()
      const updatedData = jobsData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
        id: eachItem.id,
      }))
      this.setState({jobDetails: updatedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderEmployment = () =>
    employmentTypesList.map(eachitem => (
      <EmploymentFilter
        employeeDetails={eachitem}
        key={eachitem.employmentTypeId}
        setActiveEmployeeFilterId={this.setActiveEmployeeFilterId}
      />
    ))

  renderSalaryFilter = () =>
    salaryRangesList.map(eachItem => (
      <SalaryRangeFilter
        salaryFilterDetails={eachItem}
        key={eachItem.salaryRangeId}
        setActiveSalaryFilterId={this.setActiveSalaryFilterId}
      />
    ))

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {jobDetails} = this.state
    this.fetchJobsDetails()
    console.log(jobDetails.length)
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <>
        <Header />
        <div className="jobsHomeContainer">
          <div className="leftContainers">
            {this.renderFinalProfileContainer()}
            <h1>Type of Employment</h1>
            <ul className="FilterContainer">{this.renderEmployment()}</ul>
            <h1>Salary Range</h1>
            <ul className="FilterContainer">{this.renderSalaryFilter()}</ul>
          </div>
          <div className="rightContainer">
            <div className="searchContainer">
              <input
                type="search"
                className="searchInput"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                onChange={this.onChangeSearchInput}
                onClick={this.onClickSearchButton}
              >
                x
              </button>
            </div>

            <div>
              {jobDetails.map(eachItem => (
                <JobCard jobCardDetails={eachItem} key={eachItem.id} />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

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
    return <div>{this.renderResultContainer()}</div>
  }
}

export default JobsHomePage
