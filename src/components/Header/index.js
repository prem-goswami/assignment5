import './index.css'

const Header = () => (
  <div className="navContainer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
    />
    <div className="optionsContainer">
      <button type="button" className="optionsButt">
        Home
      </button>
      <button type="button" className="optionsButt">
        Jobs
      </button>
    </div>
    <button type="button" className="butt">
      Logout
    </button>
  </div>
)

export default Header
