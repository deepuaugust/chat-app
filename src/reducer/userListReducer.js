import { USER_LIST } from "../actions/actionTypes";
import randomstring from "randomstring";

const initialState = [
  { id: randomstring.generate(), user: "Deepak Sasidharan", messages: [] },
  { id: randomstring.generate(), user: "John Doe", messages: [] },
];

/**
 * @description Reducer for user details.
 * @param {Object} state - State.
 * @param {Object} action - Action.
 * @returns {Object} State.
 */
const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST.GET:
      return [...state];
    case USER_LIST.SEND:
      return [...state].map((s) =>
        s.id === action.payload.id
          ? Object.assign({}, s, {
              messages: [...s.messages, action.payload.message],
            })
          : s
      );
    case USER_LIST.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default userListReducer;
