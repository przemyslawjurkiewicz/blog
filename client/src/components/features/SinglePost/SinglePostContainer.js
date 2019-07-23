import {connect} from 'react-redux';
import {getPost, getRequest, loadPostRequest} from '../../../redux/postsRedux';
import SinglePost from './SinglePost';

const mapStateToProps = (state, ownProps) => ({
  post: getPost(state),
  request: getRequest(state),
  id: ownProps.id,
});

const mapDispatchToProps = dispatch => ({
  loadPost: (id) => dispatch(loadPostRequest(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
