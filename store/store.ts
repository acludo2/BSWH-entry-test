import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../Screens/Users/usersReducer';
import albumsReducer from '../Screens/Albums/photosReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    albums: albumsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;