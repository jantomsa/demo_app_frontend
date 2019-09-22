import axios from "axios";
import { GET_VOTE_RESULTS, POST_VOTE,GET_ERRORS, GET_USER_VOTE } from "./types";

export const getVoteResults = () => async dispatch => {
  const res = await axios.get("/api/vote/results");
  dispatch({
    type: GET_VOTE_RESULTS,
    payload: res.data
  });
};

export const voteById = id => async dispatch => {
  try {
     await axios.post(`/api/user-vote/${id}`);
    dispatch({
      type: POST_VOTE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getUserVote = () => async dispatch => {
  const res = await axios.get("/api/user-vote/");
  dispatch({
    type: GET_USER_VOTE,
    payload: res.data
  });
};

