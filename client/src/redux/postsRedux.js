import {API_URL} from '../config';
import axios from 'axios';

// action name creator

const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* SELECTORS */

export const getPosts = ({posts}) => posts.data;
export const getPostsNumber = ({posts}) => posts.data.length;
export const getRequest = ({posts}) => posts.request;

/* ACTIONS */

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const loadPosts = payload => ({payload, type: LOAD_POSTS});

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({type: START_REQUEST});

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({type: END_REQUEST});

export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const errorRequest = error => ({error, type: ERROR_REQUEST});

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

/* INITIAL STATE */

const initialState = {
  data: [],
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
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: {pending: false, error: action.error, success: false}
      };
    default:
      return statePart;
  }
}
