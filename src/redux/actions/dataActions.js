import {
  SET_CHAMPIONS,
  LOADING_DATA,
  LIKE_CHAMPION,
  UNLIKE_CHAMPION,
  DELETE_CHAMPION,
  SET_ERRORS,
  POST_CHAMPION,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_CHAMPION,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all champions
export const getChampions = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/champions')
    .then((res) => {
      dispatch({
        type: SET_CHAMPIONS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CHAMPIONS,
        payload: []
      });
    });
};
export const getChampion = (championId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/champion/${championId}`)
    .then((res) => {
      dispatch({
        type: SET_CHAMPION,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a champion
export const postChampion = (newChampion) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/champion', newChampion)
    .then((res) => {
      dispatch({
        type: POST_CHAMPION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a champion
export const likeChampion = (championId) => (dispatch) => {
  axios
    .get(`/champion/${championId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_CHAMPION,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a champion
export const unlikeChampion = (championId) => (dispatch) => {
  axios
    .get(`/champion/${championId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_CHAMPION,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (championId, commentData) => (dispatch) => {
  axios
    .post(`/champion/${championId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteChampion = (championId) => (dispatch) => {
  axios
    .delete(`/champion/${championId}`)
    .then(() => {
      dispatch({ type: DELETE_CHAMPION, payload: championId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_CHAMPIONS,
        payload: res.data.champions
      });
    })
    .catch(() => {
      dispatch({
        type: SET_CHAMPIONS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
