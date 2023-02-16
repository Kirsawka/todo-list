import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface errorsState {
  value: {
    emailError: string;
    passError: string;
  };
}

const initialState: errorsState = {
  value: {
    emailError: '',
    passError: '',
  },
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setEmailError: (state, action: PayloadAction<string>) => {
      state.value.emailError = action.payload;
    },
    setPassError: (state, action: PayloadAction<string>) => {
      state.value.passError = action.payload;
    },
  },
});

export const { setEmailError, setPassError } = errorsSlice.actions;
export default errorsSlice.reducer;
