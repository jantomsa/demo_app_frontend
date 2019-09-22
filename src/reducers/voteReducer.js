import { GET_VOTE_RESULTS, GET_USER_VOTE } from "../actions/types";

const initialState = {
  votes: [],
  userVote: {},
  vote:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_VOTE_RESULTS:
      return {
        ...state,
        votes: action.payload
      };
    case GET_USER_VOTE:
      return {
        ...state,
        userVote: action.payload
      };

    default:
      return state;
  }
}
