import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    searchStatus: false,
    alert: null,
  }
  
  async componentDidMount() {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data,
      loading: false
    });
  }

  searchGithubUsers = async (text) => {
    this.setState({
      loading: true,
    })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data.items,
      loading: false,
      searchStatus: true,
    });
  }

  clearUserSearch = async () => {
    this.setState({
      loading: true,
      searchStatus: false
    })

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data,
      loading: false
    });
  }

  getUser = async (username) => {
    this.setState({
      loading: true,
    })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      user: res.data,
      loading: false,
    });
  }

  getUserRepos = async (username) => {
    this.setState({
      loading: true,
    })

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      repos: res.data,
      loading: false,
    });
  }

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        message: msg,
        type: type
      }
    })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 3000);
  }

  render() {
    const {users, loading, searchStatus, user, repos} = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Switch>
              <Route 
                exact 
                path='/' 
                render={props => (
                  <Fragment>
                    <Search 
                      searchUsers={this.searchGithubUsers}
                      clearSearch={this.clearUserSearch}
                      showClearButton={searchStatus ? true : false}
                      setAlert={this.setAlert}
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
                    getSingleUser={this.getUser} 
                    singleUser={user}
                    getSingleUserRepo={this.getUserRepos}
                    userRepos={repos}
                  />
                )} 
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
