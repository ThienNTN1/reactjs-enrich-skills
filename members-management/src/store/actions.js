import {
  ADD_MEMBER,
  DELETE_MEMBER,
  EDIT_MEMBER,
} from "./constant";

export const addMember = (payload) => ({
  type: ADD_MEMBER,
  payload
});

export const updateMember = (payload) => ({
  type: EDIT_MEMBER,
  payload
});
export const deleteMember = (payload) => ({
  type: DELETE_MEMBER,
  payload
});
