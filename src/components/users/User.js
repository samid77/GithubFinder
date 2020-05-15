import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';


class User extends Component {
    componentDidMount() {
        this.props.getSingleUser(this.props.match.params.username);
        this.props.getSingleUserRepo(this.props.match.params.username);
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        singleUser: PropTypes.object.isRequired,
        getSingleUser: PropTypes.func.isRequired,
        getSingleUserRepo: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    }

    render() {
        const { 
            name, 
            avatar_url, 
            location,
            bio, 
            blog, 
            login,
            html_url, 
            followers, 
            company,
            following, 
            public_repos, 
            public_gists, 
            hireable } = this.props.singleUser;
        const {loading, userRepos} = this.props;

        if(loading) return <Spinner />

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Home</Link>
                Hireable: {' '}
                {hireable ? (
                    <i className='fas fa-check text-success'/>
                ) : (
                    <i className='fas fa-times-circle text-danger'/>
                )}
                <div className="card grid-2">
                    <div className="all-center">
                        <img 
                            src={avatar_url} 
                            alt='photos' 
                            className='round-img' 
                            style={{width: '150px'}} 
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-primary my-1'>Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong>{company}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">
                        Followers: {followers}
                    </div>
                    <div className="badge badge-success">
                        Following: {following}
                    </div>
                    <div className="badge badge-danger">
                        Public Repos: {public_repos}
                    </div>
                    <div className="badge badge-light">
                        Public Gists: {public_gists}
                    </div>
                </div>
                <Repos repos={userRepos}/>
            </Fragment>
        )
    }
}

export default User
