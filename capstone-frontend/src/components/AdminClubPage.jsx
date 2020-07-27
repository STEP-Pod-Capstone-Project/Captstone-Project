import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserCard } from './UserCard'


import '../styles/Groups.css';

class AdminClubPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: {},
      requesters: [],
    }
  }

  fetchData = () => {
    fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/clubs?id=${this.props.match.params.id}`)
      .then(response => response.json()).then(clubs => {
        const club = clubs[0];
        this.setState({ club, requesters: [] });
        Promise.all(club.requestIDs.map(r => {
          return fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/user?id=${r}`)
            .then(response => response.json())
            .then(member => member && this.setState({ requesters: [...this.state.requesters, member] }))
            .catch(function (err) {
              //TODO #61: Centralize error output
              alert(err);
            });
        }))
      })
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  handleUpdate = (e) => {
    const history = this.props.history;
    e.preventDefault();
    let data = {};
    const formElements = document.getElementById("update-club-form").elements;
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].name.length !== 0 &&
          formElements[i].type !== "submit" && formElements[i].value.length !== 0) {
        data[formElements[i].name] = formElements[i].value;
      }
    }
    data.id = this.state.club.id;
    if (window.localStorage.getItem("userID") !== this.state.club.ownerID) {
      alert("Update failed. You do not own this club.");
      return;
    }

    fetch("https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/clubs", { method: "put", body: JSON.stringify(data) })
      .then(history.push(`/clubpage/${data.id}`))
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  handleDelete = () => {
    if (window.localStorage.getItem("userID") !== this.state.club.ownerID) {
      alert("Delete failed. You do not own this club.");
      return;
    }
    const history = this.props.history;
    fetch(`https://8080-bbaec244-5a54-4467-aed6-91c386e88c1a.ws-us02.gitpod.io/api/clubs?id=${this.props.match.params.id}`, { method: "delete" })
      .then(function () {
        history.push("/myclubs");
      })
      .catch(function (err) {
        //TODO #61: Centralize error output
        alert(err);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="container text-center">
        <Link to={`/clubpage/${this.props.match.params.id}`}>
          <Button className="admin-button" variant="secondary"> Return to Club Page </Button>
        </Link>
        <div className="title"> {this.state.club.name} </div>
        <Form onSubmit={this.handleUpdate} id="update-club-form">
          <Form.Group controlId="formUpdateClub">
            <Form.Label> Club Name </Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter new club name here..." />
            <Form.Label> Club Description </Form.Label>
            <Form.Control name="description" as="textarea" rows="3" placeholder="Enter new club description here..." />
          </Form.Group>
          <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        <div className="description"> Users who have requested to join: </div>
        <Row className="justify-content-center">
          {this.state.requesters.map(r =>
            <UserCard
              key={r.id}
              user={r}
              club={this.state.club}
              fetchData={this.fetchData} />
          )}
        </Row>
        <Button id="delete-club" variant="danger" onClick={this.handleDelete}>Delete Club</Button>
      </div>
    );
  }
}

export default AdminClubPage;