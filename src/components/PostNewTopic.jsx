import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as api from './api';
import '../Topics.css';

class PostNewTopic extends Component {
  state = {
    isPosted: false,
    slug: '',
    description: ''
  };
  render() {
    return (
      <div className="topicform">
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="topicsluginput"
            value={this.state.slug}
            id="slug"
            onChange={this.handleChange}
            placeholder="Topic Name"
          />
          <textarea
            className="topicdescriptioninput"
            value={this.state.description}
            id="description"
            onChange={this.handleChange}
            placeholder="Topic Description"
          />
          {this.state.slug.length && this.state.description.length ? (
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
      .addTopic(this.state)
      .then(data => {
        this.props.posted(data);
      })
      .then(this.setState({ slug: '', description: '' }))
      .catch(err => {
        navigate('/error', {
          state: {
            code: err.code,
            message: err.message,
            from: '/posttopic'
          }
        });
      });
  };
}

export default PostNewTopic;
