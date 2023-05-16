import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { createUser } from "../thunks/createUser";
import { removeUser } from "../thunks/removeUser";


const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;

    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    }); 

    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload)
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload)
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
