import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'


const Search = () =>  {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    const changeSearchText = (e) => {
        setText(e.target.value);
    }

    const searchUser = (e) => {
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please enter something', 'danger');
        } else {
            githubContext.searchUsers(text);
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
            {githubContext.searchStatus && (<button className='btn btn-danger btn-block' onClick={githubContext.clearUserSearch}>Clear Search</button>)}
        </div>
    )
}



export default Search
