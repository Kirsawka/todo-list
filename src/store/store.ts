import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import errorReducer from './reducers/errors';

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
