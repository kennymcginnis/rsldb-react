import {
  SET_CHAMPIONS,
  LIKE_CHAMPION,
  UNLIKE_CHAMPION,
  LOADING_DATA,
  DELETE_CHAMPION,
  POST_CHAMPION,
  SET_CHAMPION,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  champions: [],
  champion: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_CHAMPIONS:
      return {
        ...state,
        champions: action.payload,
        loading: false
      };
    case SET_CHAMPION:
      return {
        ...state,
        champion: action.payload
      };
    case LIKE_CHAMPION:
    case UNLIKE_CHAMPION:
      let index = state.champions.findIndex(
        (champion) => champion.championId === action.payload.championId
      );
      state.champions[index] = action.payload;
      if (state.champion.championId === action.payload.championId) {
        state.champion = action.payload;
      }
      return {
        ...state
      };
    case DELETE_CHAMPION:
      index = state.champions.findIndex(
        (champion) => champion.championId === action.payload
      );
      state.champions.splice(index, 1);
      return {
        ...state
      };
    case POST_CHAMPION:
      return {
        ...state,
        champions: [action.payload, ...state.champions]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        champion: {
          ...state.champion,
          comments: [action.payload, ...state.champion.comments]
        }
      };
    default:
      return state;
  }
}
