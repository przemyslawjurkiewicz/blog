import {connect} from 'react-redux';
import {getPostsNumber} from '../../../redux/postsRedux';
import PostsCounter from './PostsCounter';

const mapStateToProps = state => ({
  postsNumber: getPostsNumber(state)
});

export default connect(
  mapStateToProps  
)(PostsCounter);