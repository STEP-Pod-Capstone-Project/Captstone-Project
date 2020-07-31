import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

import '../styles/Groups.css';


export class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriend: false,
    }
    fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/user?id=${window.localStorage.getItem('userID')}`)
      .then(response => response.json())
      .then(user => this.setState({isFriend:user.friendIDs.includes(this.props.user.id)}))
      .catch(e => alert(e));
  }

  removeMember = () => {
    const removal = {
      remove_memberIDs: this.props.user.id,
      id: this.props.club.id
    }
    fetch('/api/clubs', { method: 'put', body: JSON.stringify(removal) })
      .then(this.props.removeMember(this.props.user.id))
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  acceptMember = () => {
    if (this.props.club.requestIDs && !this.props.club.requestIDs.includes(this.props.user.id)) {
      alert('This user did not request to join, so they cannot be accepted.');
      return;
    }
    const acceptance = {
      remove_requestIDs: this.props.user.id,
      add_memberIDs: this.props.user.id,
      id: this.props.club.id
    };
    fetch('/api/clubs', { method: 'put', body: JSON.stringify(acceptance) })
      .then(this.props.fetchData)
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  rejectMember = () => {
    const rejection = {
      remove_requestIDs: this.props.user.id,
      id: this.props.club.id
    };
    fetch('/api/clubs', { method: 'put', body: JSON.stringify(rejection) })
      .then(this.props.fetchData)
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  addFriend = () => {
    const addFriend = {
      id: window.localStorage.getItem('userID'),
      add_friendIDs: this.props.user.id, 
    };
    fetch('/api/user', {method:'put', body: JSON.stringify(addFriend)})
      .then(this.setState({isFriend: true}))
      .catch(e => alert(e));
  }

  removeFriend = () => {
    const removeFriend = {
      id: window.localStorage.getItem('userID'),
      remove_friendIDs: this.props.user.id, 
    }
    fetch('/api/user', {method:'put', body: JSON.stringify(removeFriend)})
      .then(this.setState({isFriend: false}))
      .catch(e => console.log(e));
  }

  render() {
    const isMember = this.props.club && this.props.club.memberIDs && this.props.club.memberIDs.includes(this.props.user.id);
    const isRequester = this.props.club && !isMember && this.props.club.requestIDs && this.props.club.requestIDs.includes(this.props.user.id);
    const removeMember = this.props.club
      && this.props.club.ownerID === window.localStorage.getItem('userID')
      && this.props.club.ownerID !== this.props.user.id
      && <Button className='mt-2' variant='danger' onClick={this.removeMember}>
        Remove&nbsp;Member
         </Button>;
    const requestButtons = this.props.club
      && this.props.club.ownerID === window.localStorage.getItem('userID')
      && this.props.club.ownerID !== this.props.user.id
      && <div>
        <Button className='mt-2' variant='primary' onClick={this.acceptMember}>
          Accept&nbsp;Member
        </Button>
        <Button className='mt-2' variant='danger' onClick={this.rejectMember}>
          Reject&nbsp;Member
        </Button>
      </div>
    return (
      <Col className='user-card' xs={12} sm={6} md={2} >
        <img id='user-profile' src={this.props.user.profileImageUrl} alt='Profile' />
        <div> {this.props.user.fullName} </div>
        {this.state.isFriend 
          ? <Button className='mt-2' variant='danger' onClick={this.removeFriend}> Remove Friend </Button>
          : <Button className='mt-2' variant='primary' onClick={this.addFriend}> Add Friend </Button> }
        {isMember && removeMember}
        {isRequester && requestButtons}
      </Col>
    );
  }
}
