import axios from 'axios';
import { AlbumPhotos } from '../../store/types';


// Define the fetchAlbumPhotosByAlbumId function
export const fetchAlbumPhotosByAlbumId =
    async (albumId: number) => {
        return new Promise<AlbumPhotos[]>((resolve, reject) => {
            let response = axios.get<AlbumPhotos[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
                .then(response => {
                    resolve(response.data); // Resolve with the response data
                })
                .catch(error => {
                    reject(new Error(error.response?.data?.message || 'Unexpected error occurred')); // Reject with an error
                });
        });
    };

// Define the fetchAllAlbumPhotos function
export const fetchAllAlbumPhotos =
    async () => {
        return new Promise<AlbumPhotos[]>((resolve, reject) => {
            axios.get<AlbumPhotos[]>('https://jsonplaceholder.typicode.com/photos')
                .then(response => {
                    resolve(response.data); // Resolve with the response data
                })
                .catch(error => {
                    reject(new Error(error.response?.data?.message || 'Unexpected error occurred')); // Reject with an error
                });
        });
    };