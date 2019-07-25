import React from 'react';
import {PropTypes} from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';

class SinglePost extends React.Component {
  componentDidMount() {
    const {loadPost} = this.props;
    loadPost(this.props.id);
  }

  render() {
    const {post, request} = this.props;
    return (
      <div>
        {request.pending && request.success != null && <Spinner />}
        {!request.pending && request.success && (
          <div>
            <PageTitle>{post.title}</PageTitle>
            <p>Author: {post.author}</p>
            <HtmlBox>{post.content}</HtmlBox>
          </div>
        )}
        {!request.pending && request.error != null && (
          <Alert variant='error'>{request.error}</Alert>
        )}
        {!request.pending && request.success && !post.content && (
          <Alert variant='info'>No post content</Alert>
        )}
        {!request.pending && request.success && !post.title && (
          <Alert variant='info'>No post title</Alert>
        )}
      </div>
    );
  }
}

SinglePost.propTypes = {
  posts: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ),
  loadPost: PropTypes.func.isRequired
};

export default SinglePost;
