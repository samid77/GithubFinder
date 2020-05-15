import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Search extends Component {
    state = {
        text: '',
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearSearch: PropTypes.func.isRequired,
        showClearButton: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    changeSearchText = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchUser = (e) => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter something', 'danger');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({
                text: '',
            })
        }
    }

    render() {
        const {showClearButton, clearSearch } = this.props;

        return (
            <div>
                <form onSubmit={this.searchUser} className='form'>
                    <input 
                        type='text' 
                        name='text'
                        value={this.state.text}
                        onChange={this.changeSearchText}
                        placeholder='Search Github Users...'
                    />
                    <input type='submit' value='Search' className='btn btn-success btn-block'/>
                </form>
                {showClearButton && (<button className='btn btn-danger btn-block' onClick={clearSearch}>Clear Search</button>)}
            </div>
        )
    }
}



export default Search
