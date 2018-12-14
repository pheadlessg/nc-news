import React from 'react';
import { Link } from '@reach/router';

const ArticleListCard = ({ data }) => {
  const {
    article_id,
    title,
    topic,
    author,
    created_at,
    votes,
    comment_count
  } = data;
  const date = new Date(created_at).toUTCString();
  return (
    <div className="articlelink">
      <span className="linklink">
        <Link key={article_id} to={`/articles/${article_id}`}>
          {title}
        </Link>
      </span>
      <span className="linktopic">
        <Link key={topic} to={`/articles/t/${topic}`}>
          {topic}
        </Link>
      </span>
      <span className="linkuser">{author}</span>
      <span className="linkdate">{date}</span>
      <span className="linkvotes">Votes: {votes}</span>

      <span className="linkcomments">
        <Link key={date} to={`/articles/${article_id}/comments`}>
          Comments: {comment_count}
        </Link>
      </span>
    </div>
  );
};

export default ArticleListCard;
