import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {getProfiles} from '../../actions/profile';

const Dashboard = ({getCurrentProfile,deleteAccount, getProfiles, auth:{user},profile:{profile,loading}}) => {

    useEffect(() => {
       getCurrentProfile()
       //getProfiles()
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner/> : 
    <Fragment>
        <h1 className='large text-primary'>Dashbpard</h1>
        <p className='lead'>
            <i className="fa fa-user"/> Welcome {user && user.name}
        </p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>

            <div className='my-2'>
                <button className ='btn btn-danger' onClick={()=> deleteAccount()}>
                    <i className='fa fa-user'></i> Delete My Account
                </button>
            </div>
        </Fragment> : 
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p> 
          <Link to='/create-profile' className='btn btn-primary my-1'>
          Create Profile
          </Link>
        </Fragment>}
    </Fragment>
    
}

Dashboard.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
auth: state.auth,
profile: state.profile,
deleteAccount: PropTypes.func.isRequired,


})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount,getProfiles})(Dashboard);
