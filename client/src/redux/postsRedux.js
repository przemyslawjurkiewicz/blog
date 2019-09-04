import {API_URL} from '../config';
import axios from 'axios';

// action name creator

const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* SELECTORS */

export const getPosts = ({posts}) => posts.data;
export const getPost = ({posts}) => posts.singlePost;
export const getPostsNumber = ({posts}) => posts.amount;
export const getRequest = ({posts}) => posts.request;
export const getPages = ({posts}) =>
  Math.ceil(posts.amount / posts.postsPerPage);

/* ACTIONS */

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const loadPosts = payload => ({payload, type: LOAD_POSTS});

export const LOAD_POST = createActionName('LOAD_POST');
export const loadPost = payload => ({payload, type: LOAD_POST});

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({type: START_REQUEST});

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({type: END_REQUEST});

export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const resetRequest = () => ({type: RESET_REQUEST});

export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const errorRequest = error => ({error, type: ERROR_REQUEST});

export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');
export const loadPostsByPage = payload => ({payload, type: LOAD_POSTS_PAGE});

/* THUNKS */

export const loadPostsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(loadPosts(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadPostRequest = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts/${id}`);
      dispatch(loadPost(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const addPostRequest = post => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      await axios.post(`${API_URL}/posts`, post);
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadPostsByPageRequest = page => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      const postsPerPage = 10;
      const startAt = (page - 1) * postsPerPage;
      const limit = postsPerPage;

      let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const payload = {
        posts: res.data.posts,
        amount: res.data.amount,
        postsPerPage,
        presentPage: page
      };
      dispatch(loadPostsByPage(payload));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  singlePost: {},
  amount: 0,
  postsPerPage: 10,
  presentPage: 1,
  request: {
    pending: false,
    error: null,
    success: null
  }
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POSTS:
      return {...statePart, data: action.payload};
    case LOAD_POST:
      return {...statePart, singlePost: action.payload};
    case START_REQUEST:
      return {
        ...statePart,
        request: {pending: true, error: null, success: null}
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: {pending: false, error: null, success: true}
      };
    case RESET_REQUEST:
      return {
        ...statePart,
        request: {pending: false, error: null, success: null}
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: {pending: false, error: action.error, success: false}
      };
    case LOAD_POSTS_PAGE:
      return {
        ...statePart,
        postsPerPage: action.payload.postsPerPage,
        presentPage: action.payload.presentPage,
        amount: action.payload.amount,
        data: [...action.payload.posts]
      };
    default:
      return statePart;
  }
}
