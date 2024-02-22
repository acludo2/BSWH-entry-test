import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchAlbumPhotosByAlbumId, fetchAllAlbumPhotos } from './photosApi'; // Import your fetch functions
import { AlbumsState, AlbumPhotos } from '../../store/types';

export const initialState: AlbumsState = {
    allphotos: [],
    isAllPhotos: false,
    currentAlbum: []
}

export const fetchAllPhotosAsync = createAsyncThunk<AlbumPhotos[]>(
    'albums/fetchAllPhotos',
    async () => {
        return await fetchAllAlbumPhotos();
    }
);

export const fetchPhotosByAlbumIdAsync = createAsyncThunk<AlbumPhotos[]>(
    'albums/fetchPhotosByAlbumId',
    async (albumId: any) => {
        let response = await fetchAlbumPhotosByAlbumId(albumId);
        return response
    }
);

export const albumsSlice = createSlice({
    name: "Albums",
    initialState,
    reducers: {
        setAllPhotos: (state, action: PayloadAction<AlbumPhotos[]>) => {
            state.allphotos = action.payload;
            state.isAllPhotos = true;
        },
        setCurrentAlbum: (state, action: PayloadAction<AlbumPhotos[]>) => {
            state.currentAlbum = action.payload;
            state.isAllPhotos = false;
        },
        toggleDisplayMode: (state) => {
            state.isAllPhotos = !state.isAllPhotos;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPhotosAsync.fulfilled, (state, action) => {
                state.allphotos = action.payload;
                state.isAllPhotos = true;
            })
            .addCase(fetchPhotosByAlbumIdAsync.fulfilled, (state, action) => {
                state.currentAlbum = action.payload;
                state.isAllPhotos = false;
            });
    }
});

export const { setAllPhotos, setCurrentAlbum, toggleDisplayMode } = albumsSlice.actions;

export const selectAllPhotos = (state: RootState) => state.albums.allphotos;

export const selectCurrentAlbum = (state: RootState) => state.albums.currentAlbum;

export default albumsSlice.reducer;
