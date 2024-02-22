import axios from 'axios';
import { Album, User } from '../../store/types';

// Define the fetchUsersAsync thunk
export const fetchUsers =
  async () => {
    return new Promise<User[]>((resolve, reject) => {
      axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          resolve(response.data); // Resolve with the response data
        })
        .catch(error => {
          reject(new Error(error.response?.data?.message || 'Unexpected error occurred')); // Reject with an error
        });
    });
  }




  // Define the fetchAlbums function
  export const fetchAlbums = 
  async (userId: number) => {
    return new Promise<Album[]>((resolve, reject) => {
      axios.get<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then(response => {
          resolve(response.data); // Resolve with the response data
        })
        .catch(error => {
          reject(new Error(error.response?.data?.message || 'Unexpected error occurred')); // Reject with an error
        });
    });
  };
  