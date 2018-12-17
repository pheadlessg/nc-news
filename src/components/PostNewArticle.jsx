import React, { Component } from 'react';
import * as api from './api';
import { navigate } from '@reach/router';

class PostNewArticle extends Component {
  state = {
    isPosted: false,
    topic: '',
    body: '',
    title: '',
    username: this.props.user,
    responseArticle: '',
    topics: []
  };
  render() {
    return (
      <div className="postarticle">
        <h1 className="postarticleheader">Post a New Article</h1>
        <form onSubmit={this.handleSubmit}>
          <select
            className="topicselect"
            id="topic"
            onChange={this.handleChange}
          >
            <option disabled selected value>
              -- Select a Topic --
            </option>
            {this.state.topics.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug} - {topic.description}
                </option>
              );
            })}
          </select>
          <input
            className="articletitle"
            id="title"
            onChange={this.handleChange}
            placeholder="Title"
            type="text"
          />
          <textarea
            className="articlebody"
            id="body"
            onChange={this.handleChange}
            rows="30"
            cols="100"
            placeholder="Write a new article here"
          />
          {this.state.body.length &&
          this.state.title.length &&
          this.state.topic.length ? (
            <button className="articlepostbutton" type="submit">
              POST
            </button>
          ) : (
            <p>Article Cannot Have Empty Fields!</p>
          )}
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
    api.addArticle(this.state).then(data => {
      this.setState(prevState => ({
        ...prevState,
        isPosted: true,
        responseArticle: data
      }));
    });
  };
  componentDidMount() {
    this.getAllTopics();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.responseArticle !== this.state.responseArticle) {
      navigate(`/articles/${this.state.responseArticle.article.article_id}`);
      alert('Article Posted!');
    }
  }
  getAllTopics() {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }
}

export default PostNewArticle;
