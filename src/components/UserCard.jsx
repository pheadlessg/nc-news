import React, { Component } from 'react';
import * as api from './api';

class UserCard extends Component {
  state = {
    user: {},
    isLoading: true
  };
  render() {
    const { user } = this.state.user;
    if (user) {
      return (
        <div>
          <img
            height="50"
            width="50"
            src={`${user.avatar_url}`}
            alt="User avatar"
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg';
            }}
          />
          {this.state.user.user.username}
        </div>
      );
    } else {
      return <div>User</div>;
    }
  }
  getSingleUser() {
    api.fetchSingleUser(this.props.data).then(user => {
      this.setState({ user: user });
    });
  }
  componentDidMount() {
    this.getSingleUser();
  }
}

export default UserCard;
