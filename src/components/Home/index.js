import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bgContainerHome">
      <div className="textContainer">
        <h1>Find The Job That Fits Your Life </h1>
        <p>
          Millions of People are searching for jobs,salary information, company.
          Find the job that fits your abilities and potential. reviews
        </p>
        <Link to="/jobs">
          <button type="button" className="findJobsButton">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
