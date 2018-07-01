import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unPersistMyInfo } from '../../services/localStorage';
import { compose } from 'redux';

const Navbarr = ({ isManager, isAuthenticated, logout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <NavLink className="navbar-brand" to="/"> Bikes Rental © </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" >
                    {
                        isManager ?
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="usersTab" to='/users' className="nav-link">Users</NavLink>
                            </li> :
                            null

                    }

                    {
                        isAuthenticated ?
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="myProfileTab" to='/myProfile' className="nav-link">My profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="inviteUserTab" to='/bikes/listing' className="nav-link">Bikes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="mapTab" to='/map' className="nav-link">Map</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="myUpcomingReservationsTab" to='/myUpcomingReservations' className="nav-link">My Upcoming Reservations</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="myPastReservationsTab" to='/myPastReservations' className="nav-link">My Past Reservations</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="ratingsTab" to='/myRatings' className="nav-link">My Ratings</NavLink>
                            </li> 
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="addBike" to='/addBike' className="nav-link">Add new Bike</NavLink>
                            </li> 

                            </React.Fragment>
                            :
                            <li className="nav-item">
                                <NavLink activeClassName="active" id="loginTab" to='/map' className="nav-link">Login</NavLink>
                            </li> 

                    }
            </ul>
            {
                isAuthenticated &&
                <ul className="navbar-nav ml-auto mr-5" >
                    <li className="nav-item" onClick={() => logout()}>
                        <Link to="login" className="nav-link">Logout</Link>
                    </li>
                </ul>
            }
        </div>

    </nav>
)

Navbarr.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isManager: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.authStoreState.isAuthenticated,
    isManager: state.authStoreState.role === 'manager'
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        unPersistMyInfo()
        dispatch({ type: 'LOGGED_OUT' })
    }
})

export const Navbar = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbarr)


