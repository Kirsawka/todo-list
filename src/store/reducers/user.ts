import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  value: {
    userId: string;
    photoURL: string;
    todos: { id: number; text: string; isCompleted: boolean }[];
  };
}

const initialState: userState = {
  value: {
    userId: '',
    photoURL: '',
    todos: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; photoURL: string }>) => {
      state.value.userId = action.payload.id;
      state.value.photoURL = action.payload.photoURL;
    },
    setUserTodos: (
      state,
      action: PayloadAction<{ id: number; text: string; isCompleted: boolean }[]>
    ) => {
      state.value.todos = action.payload;
    },
  },
});

export const { setUser, setUserTodos } = userSlice.actions;
export default userSlice.reducer;
