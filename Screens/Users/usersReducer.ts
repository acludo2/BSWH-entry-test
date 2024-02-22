import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchUsers, fetchAlbums } from './usersApi'; // Import your fetch functions
import { UsersState, User, Album, AlbumsState } from '../../store/types';

export const initialState: UsersState = {
  users: [],
  status: 'idle',
  hasSetUsers: false,
  albums: []
};


export const fetchUsersAsync = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return await fetchUsers();
  }
);

export const fetchAlbumsAsync = createAsyncThunk(
  'users/fetchAlbums',
  async (_, { dispatch, getState }) => {
    let state: any = getState();
    let users = state.users.users;
    await users.forEach(async (user: User) => {
      let albums = await fetchAlbums(user.id);
      let mappedAlbums = albums.map((item)=>{return {userId:item.userId,id:item.id,title:item.title,ishidden:false}})
      await dispatch(setUserAlbums({ userId: user.id, albums: mappedAlbums }))
    })
  }
);




export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUserAlbums: (state, action: PayloadAction<{ userId: number; albums: Album[] }>) => {
      const { userId, albums } = action.payload;
      state.albums.push({ userId: userId, albums: albums })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.users = action.payload;
        state.hasSetUsers = true;
      })
  },
});

export const { setUserList, setUserAlbums } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUserAlbums = (state: RootState) => state.users.albums;

export default usersSlice.reducer;
