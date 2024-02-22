// types.ts

export interface User {
  id: number;
  name: string;
  albums: Album[]; // Assuming albums is an array of strings
  // Add other user properties here
}

  export interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'failed' | "completed";
    hasSetUsers:boolean
    albums:Array<AlbumArray>
  }
  

interface AlbumArray {
   userId:number;
   albums:Album[]
}



export interface Album {
  userId:number;
  id:number;
  title:string;
  ishidden:boolean;
}

export interface AlbumPhotos {
  albumId:number;
  id:number;
  title:string;
  url:string;
  thumbnailUrl:string;
}

export interface AlbumsState {
  allphotos:AlbumPhotos[];
  isAllPhotos:boolean;
  currentAlbum:AlbumPhotos[];
}

