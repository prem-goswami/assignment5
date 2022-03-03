import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import JobsHomePage from './components/JobsHomePage'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificJobDetails from './components/SpecificJobDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsHomePage} />
    <ProtectedRoute exact path="/jobs/:id" component={SpecificJobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
