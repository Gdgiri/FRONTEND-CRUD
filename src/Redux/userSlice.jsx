import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  // name , initial state, reducer

  name: "users", // Name of the Slice
  initialState: {
    users: [], // initial state is empty array
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload.map((ele) => {
        return { id: ele._id, name: ele.name, email: ele.email, age: ele.age };
      });
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (ele) => ele.id === action.payload.id
      );
      state.users[index] = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        age: action.payload.age,
      };
    },
    deleteUser: (state, action) => {
      const id = action.payload.id;
      // after delete it is use to display
      state.users = state.users.filter((ele) => ele.id !== id);
    },
  },
});

export const { getUser, createUser, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
