import React from 'react';
import {PropTypes} from 'prop-types';
import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class Posts extends React.Component {
  componentDidMount() {
    const {loadPosts} = this.props;
    loadPosts();
  }

  render() {
    const {posts, request} = this.props;

    return (
      <div>
        {request.pending && request.success != null && <Spinner />}
        {!request.pending && request.success && posts.length > 0 &&  <PostsList posts={posts} />}
        {!request.pending && request.error != null  &&  <Alert variant='error'>{request.error}</Alert>}
        {!request.pending && request.success  && posts.length ===0 && <Alert variant='info'>No posts</Alert>}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ),
  loadPosts: PropTypes.func.isRequired
};

export default Posts;
