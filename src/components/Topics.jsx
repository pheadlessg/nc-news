import React, { Component } from 'react';
import * as api from './api';
import { Link } from '@reach/router';
import PostNewTopic from './PostNewTopic';

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    isPosted: false,
    addTopicToggle: false
  };
  render() {
    return (
      <>
        <h1 className="topicheader">Topics</h1>
        {!this.state.addTopicToggle ? (
          <button onClick={this.handleTopicButton}>Add New Topic</button>
        ) : (
          <PostNewTopic posted={this.handlePost} topics={this.state.topics} />
        )}

        <div className="topicpage">
          {this.state.topics.map((topic, index) => {
            return (
              <Link key={index * 3.14} to={`/articles/t/${topic.slug}`}>
                <div key={index} className="topiccard">
                  <h2 className="topicslug" key={topic.slug}>
                    {topic.slug}
                  </h2>
                  <h3 className="topicdescription" key={topic.description}>
                    {topic.description}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
  getAllTopics() {
    api.fetchAllTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllTopics();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoading !== this.state.isLoading) {
      this.getAllTopics();
      this.setState({ isPosted: false, addTopicToggle: false });
    }
    if (prevState.isPosted !== this.state.isPosted) {
      this.getAllTopics();
      this.setState({ isPosted: false, addTopicToggle: false });
    }
  }
  handlePost = posted => {
    this.setState({ isPosted: posted });
  };
  handleTopicButton = () => {
    this.setState({ addTopicToggle: true });
  };
}

export default Topics;
