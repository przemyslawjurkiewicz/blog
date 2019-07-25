import React from 'react';
import Post from '../../features/SinglePost/SinglePostContainer';

const PostPage = props => (  
  <div>
    <Post id={props.match.params.id} />
  </div>
);

export default PostPage;