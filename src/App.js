import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
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
    const {users, loading, searchStatus} = this.state;

    return (
      <div className='App'>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
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
        </div>
      </div>
    )
  }
}

export default App;
