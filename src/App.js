import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      
      setUsers(res.data);
      setLoading(false);
    }
    
    fetchData();
    // eslint-disable-next-line
  }, [])


  const searchGithubUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
    setSearchStatus(true);

  }

  const clearUserSearch = async () => {
    setLoading(true);
    setSearchStatus(false);

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data);
    setLoading(false);

  }

  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

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
                    searchUsers={searchGithubUsers}
                    clearSearch={clearUserSearch}
                    showClearButton={searchStatus ? true : false}
                    setAlert={setAlertMessage}
                  />
                  <Users 
                    loading={loading}
                    users={users}
                  />
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
                  loading={loading} 
                  getSingleUser={getUser} 
                  singleUser={user}
                  getSingleUserRepo={getUserRepos}
                  repos={repos}
                />
              )} 
            />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
