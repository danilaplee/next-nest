import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { Photo } from 'pexels';

export interface GalleryState {
  galleryImages: Photo[]
}

const initialState: GalleryState = {
  galleryImages:[]
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery: (
      state,
      action: PayloadAction<{photos:Photo[]}>,
    ) => {
      state.galleryImages = action.payload.photos
    },
    
  },
});

export const {setGallery} =
  GallerySlice.actions;

export default GallerySlice.reducer;
