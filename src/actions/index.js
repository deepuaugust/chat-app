import * as actionTypes from "./actionTypes";

/**
 * @description - Function to get user list.
 * @returns {Object} - Actions type.
 */
export const getUserList = () => ({
  type: actionTypes.USER_LIST.GET,
});

/**
 * @description - Function to send message to user.
 * @param {Object} data - Data object.
 * @returns {Object} - Actions type.
 */
export const sendUserMessage = (data) => ({
  type: actionTypes.USER_LIST.SEND,
  payload: data,
});

/**
 * @description - Function to add chat.
 * @param {Object} data - Data object.
 * @returns {Object} - Actions type.
 */
export const addUserChat = (data) => ({
  type: actionTypes.USER_LIST.ADD,
  payload: data,
});
