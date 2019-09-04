import {connect} from 'react-redux';
import {
  getPosts,
  getRequest,
  loadPostsByPageRequest,
  getPages,
  resetRequest
} from '../../../redux/postsRedux';
import Posts from './Posts';

const mapStateToProps = state => ({
  posts: getPosts(state),
  request: getRequest(state),
  pages: getPages(state)
});

const mapDispatchToProps = dispatch => ({
  loadPostsByPage: (page) => dispatch(loadPostsByPageRequest(page)),
  resetRequest: () => dispatch(resetRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
