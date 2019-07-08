import React from 'react';

class PostsCounter extends React.Component {
  render() {
    const {postsNumber} = this.props;
    return (
      <div>Posts amount: {postsNumber > 0 ? postsNumber : 'no posts'}</div>
    );
  }
}

export default PostsCounter;
