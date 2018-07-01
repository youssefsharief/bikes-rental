import React from 'react'
import PropTypes from 'prop-types';
import { ApiService } from '../../services/data.service';
import { toast } from 'react-toastify';
import {EnhancedEditProfileForm} from '../forms/ProfileForm/EnhancedEditProfileForm';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';


const mapStateToProps = state => ({id: state.authStoreState.id})

class Com extends React.Component {
    constructor(props) {
        super(props);
        this.state = { profile: null };
    }
    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile() {
        return ApiService.getUser(this.props.id).then(x => {
            this.setState({ profile: x })
        }).catch(err => {
            toast.error(err)
        })
    }


    render() {
        return (
            this.state.profile ?
            <div>
                <EnhancedEditProfileForm profile={this.state.profile}/>
                <Button className="mt-4" color="default"onClick={()=>this.props.history.push('changeMyPasswordUsingOldPassword')}>Change My Password </Button>
            </div>
           :
           <p>Waiting</p>
        )
    }
}


export const MyProfile = connect(mapStateToProps, {})(Com)



Com.propTypes = {
    id: PropTypes.string,
    history: PropTypes.any
}
