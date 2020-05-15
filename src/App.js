import React, { useState, useContext, Fragment, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext'

const App = () => {

  const githubContext = useContext(GithubContext);

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // useEffect(() => {
  //     githubContext.getUsers();
  //     // eslint-disable-next-line
  //   }, []);

  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);

  }

  const setAlertMessage = (msg, type) => {
    setAlert({msg, type})

    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            <Switch>
              <Route 
                exact 
                path='/' 
                render={props => (
                  <Fragment>
                    <Search 
                      setAlert={setAlertMessage}
                    />
                    <Users/>
                  </Fragment>
                )} 
              />
              <Route exact path='/about' component={About}/>
              <Route 
                exact 
                path='/user/:username' 
                render={props => (
                  <User 
                    {...props} 
                    getSingleUserRepo={getUserRepos}
                    repos={repos}
                  />
                )} 
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App;
