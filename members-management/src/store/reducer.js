import {
  ADD_MEMBER,
  DELETE_MEMBER,
  EDIT_MEMBER,
} from "./constant";

// const getLocalStorage = () => {
//   return JSON.parse(localStorage.getItem("members")) ?? [];
// };

// const setLocalStorage = (value) => {
//   localStorage.setItem("members", JSON.stringify(value));
// };

const getLocalStorage = () => {
  let dataLocal = [];
  const data = localStorage.getItem("data");
  if (data) {
    dataLocal = [...JSON.parse(data).members];
  }
  return dataLocal;
};

const setLocalStorage = (value) => {
  localStorage.setItem("data", JSON.stringify(value));
};

const initState = {
  members: [...getLocalStorage()],
};


function reducer(state, action) {
  // const newTodos = state.todos;

  switch (action.type) {
    case ADD_MEMBER:
      setLocalStorage({ members: [...state.members, action.payload] });

      return {
        ...state,
        members: [...state.members, action.payload],
      };
    case EDIT_MEMBER:
      const updatedMembers = [...state.members];
      //Find index of specific object using findIndex method.    
      const index = updatedMembers.findIndex((member => member.key === action.payload.key));
      updatedMembers.splice(index, 1, action.payload);

      setLocalStorage({ members: [...updatedMembers] });

      return {
        ...state,
        members: [...state.members],
      };
    case DELETE_MEMBER:
      const members = [...state.members];
      const newMembers = members.filter(member => member.key !== action.payload)

      setLocalStorage({ members: [...newMembers] });

      return {
        ...state,
        members: [...newMembers],
      };
    default:
      throw new Error("Invalid action");
  }
}

export { initState };
export default reducer;
