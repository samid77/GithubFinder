import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Search = ({ showClearButton, clearSearch, setAlert, searchUsers }) =>  {
    const [text, setText] = useState('');

    const changeSearchText = (e) => {
        setText(e.target.value);
    }

    const searchUser = (e) => {
        e.preventDefault();
        if(text === '') {
            setAlert('Please enter something', 'danger');
        } else {
            searchUsers(text);
            setText('');
        }
    }

    return (
        <div>
            <form onSubmit={searchUser} className='form'>
                <input 
                    type='text' 
                    name='text'
                    value={text}
                    onChange={changeSearchText}
                    placeholder='Search Github Users...'
                />
                <input type='submit' value='Search' className='btn btn-success btn-block'/>
            </form>
            {showClearButton && (<button className='btn btn-danger btn-block' onClick={clearSearch}>Clear Search</button>)}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}



export default Search
