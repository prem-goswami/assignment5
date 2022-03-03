import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="navContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="optionsContainer">
        <Link to="/">
          <li>
            <button type="button" className="optionsButt">
              Home
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <button type="button" className="optionsButt">
              Jobs
            </button>
          </li>
        </Link>
      </div>
      <li>
        <button type="button" className="butt" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
