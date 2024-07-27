const initialState = {
  username: localStorage.getItem("username") || "", // Load username from localStorage if available
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      localStorage.setItem("username", action.payload); // Save username to localStorage
      return {
        ...state,
        username: action.payload,
      };
    case "CLEAR_USERNAME":
      localStorage.removeItem("username"); // Clear username from localStorage
      return {
        ...state,
        username: "",
      };
    default:
      return state;
  }
};

export default userReducer;