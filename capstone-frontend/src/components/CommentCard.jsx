import React, { Component } from 'react';

import '../styles/Groups.css';


class CommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  fetchUserData = async () => {
    await fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/user?id=${this.props.comment.userID}`)
        .then(response => response.json()).then(userJson => this.setState({user: userJson}))
        .catch(function(err) {
            //TODO #61: Centralize error output
            alert(err); 
        });
  }

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    const user = this.state.user && 
                     <span className="name"> 
                        {this.state.user.fullName} 
                      </span>;
    return (
      <div className="comment-card">
        <img className="profile" alt="Profile" src={this.state.user.profileImageUrl} />
        <div>
          <div className="header">
            {user}
            <span className="date">
              {(new Date(this.props.comment.whenCreated)).toString()}
            </span>
          </div>
          <div> {this.props.comment.text} </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;
