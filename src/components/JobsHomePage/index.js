import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'
import Header from '../Header'

class JobsHomePage extends Component {
  state = {
    profileDetails: [],
  }

  componentDidMount() {
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
      console.log(data)
      const updatedData = data.profile_details.map(eachItem => ({
        name: eachItem.name,
        profileImage: eachItem.profile_image_url,
        shortBio: eachItem.short_bio,
      }))
      this.setState({profileDetails: updatedData})
    }
  }

  renderProfileContainer = () => {
    const {profileDetails} = this.state
    const {profileImage, name, shortBio} = profileDetails
    return (
      <div className="profileContainer">
        <img src={profileImage} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="jobsHomeContainer">
        <Header />
        {this.renderProfileContainer()}
      </div>
    )
  }
}

export default JobsHomePage
