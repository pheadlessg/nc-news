import React, { Component } from 'react';
import * as api from './api';

class PostNewComment extends Component {
  state = {
    username: this.props.user,
    body: ''
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="body"
            onChange={this.handleChange}
            value={this.state.body}
            rows="30"
            cols="100"
            placeholder="Write a new comment here"
          />
          {this.state.body.length ? (
            <button className="articlepostbutton" type="submit">
              POST
            </button>
          ) : null}
        </form>
      </div>
    );
  }
  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api
      .addComment(this.state, this.props.data)
      .then(data => this.props.posted(data))
      .then(this.setState({ body: '' }));
  };
}

export default PostNewComment;
