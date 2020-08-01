import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import moment from 'moment';

import '../styles/Groups.css';


class MeetingCard extends Component {
  deleteMeeting = () => {
    const deleteToken = {
      token: JSON.parse(window.localStorage.getItem('token')),
    };
    fetch(`/api/meetings?id=${this.props.meeting.id}`, { method: 'delete', body: JSON.stringify(deleteToken) })
      .then(this.props.deleteMeeting(this.props.meeting.id))
      .catch(e => console.log(e));
  }

  render() {
    const isOwner = JSON.parse(window.localStorage.getItem('profileObj')).email === this.props.meeting.organizerEmail;
    const meetingStart = moment(new Date(parseInt(this.props.meeting.startDateTime, 10))).format('MM/DD/YYYY, h:mm a');
    const meetingEnd = moment(new Date(parseInt(this.props.meeting.endDateTime, 10))).format('MM/DD/YYYY, h:mm a');
    return (
      <Col xs={12} md={6} sm={3}>
        <Card className='group-container'>
          <Card.Body>
            <Card.Title> {this.props.meeting.summary} </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'> {this.props.meeting.location} </Card.Subtitle>
            <Card.Text> {this.props.meeting.description} </Card.Text>
            {isOwner && <Button variant='danger' onClick={this.deleteMeeting}> Delete Meeting </Button>}
          </Card.Body>
          <Card.Footer className='text-muted'> 
            <div> Start: {meetingStart} </div> 
            <div> End: {meetingEnd} </div> 
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default MeetingCard;
