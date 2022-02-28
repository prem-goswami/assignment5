import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import Header from '../Header'
import EmploymentFilter from '../EmployementFilter'
import SalaryRangeFilter from '../SalaryRangeFilter'

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
  }

  componentDidMount() {
    this.fetchJobsDetails()
    this.fetchProfileDetails()
  }

  fetchProfileDetails = async () => {
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
      this.setState({profileDetails: updatedData})
    }
  }

  setActiveEmployeeFilterId = employmentTypeId => {
    this.setState({activeEmployeeFilterId: employmentTypeId})
  }

  setActiveSalaryFilterId = salaryRangeId => {
    this.setState({activeSalaryFilterId: salaryRangeId})
  }

  renderProfileContainer = () => {
    const {profileDetails} = this.state
    const {profileImage, name, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImage} alt={name} />
        <h1 className="nameText">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  fetchJobsDetails = () => async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployeeFilterId, activeSalaryFilterId} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeFilterId}&minimum_package=${activeSalaryFilterId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(url)

    if (response.ok === true) {
      const jobsData = await response.json()
      console.log(jobsData)
      const updatedData = {
        companyLogoUrl: jobsData.jobs.company_logo_url,
        employmentType: jobsData.jobs.employment_type,
        jobDescription: jobsData.jobs.job_description,
        location: jobsData.jobs.location,
        packagePerAnnum: jobsData.jobs.package_per_annum,
        rating: jobsData.jobs.rating,
        title: jobsData.jobs.title,
      }
      this.setState({jobDetails: updatedData})
    } else {
      console.log('lauda')
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {title} = jobDetails
    return <p>{title}</p>
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

  render() {
    const {activeEmployeeFilterId, activeSalaryFilterId} = this.state
    console.log(activeEmployeeFilterId)
    console.log(activeSalaryFilterId)
    return (
      <>
        <Header />
        <div className="jobsHomeContainer">
          {this.renderJobDetails()}
          <div className="leftContainers">
            {this.renderProfileContainer()}
            <hr className="line" />
            <ul className="FilterContainer">{this.renderEmployment()}</ul>
            <hr />
            <ul className="FilterContainer">{this.renderSalaryFilter()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobsHomePage
