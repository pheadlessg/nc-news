import React, { Component } from 'react';
import * as api from './api';
import UserCard from './UserCard';

class Login extends Component {
  state = {
    users: [],
    username: ''
  };
  render() {
    return (
      <>
        <form className="login" onSubmit={this.handleSubmit}>
          <h2>Please Enter a Username or Login with a Test User</h2>
          <input
            className="usernameinput"
            value={this.state.username}
            id="username"
            onChange={this.handleChange}
            placeholder="Username"
          />
          <button className="loginbutton" type="submit">
            LOG IN
          </button>
          {this.state.users.map(user => {
            return (
              <button
                key={user.username}
                onClick={() => this.handleChangeUsername(user.username)}
              >
                <UserCard data={user.username} />
              </button>
            );
          })}
        </form>
      </>
    );
  }
  getAllUsers() {
    api.fetchAllUsers().then(users => {
      this.setState({ users: users });
    });
  }
  componentDidMount() {
    this.getAllUsers();
  }
  handleChangeUsername = username => {
    this.setState({ username });
  };
  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = () => {
    const { setUser } = this.props;
    const { username } = this.state;
    setUser(username);
  };
}

export default Login;
