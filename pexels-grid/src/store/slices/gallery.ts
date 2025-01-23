import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { Photo, Video } from 'pexels';
export type VisibleRange = {start:number, end:number, visibleStart:number, visibleEnd:number}
export interface GalleryState {
  galleryImages: Photo[] | Video[],
  visibleRange:VisibleRange
  visiblePhotos:Photo[] | Video[]
  initalDispatch:boolean;
}

const initialState: GalleryState = {
  galleryImages:[],
  visibleRange:{start:0, end:30, visibleStart:0, visibleEnd:1000},
  visiblePhotos:[],
  initalDispatch:false
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGallery: (
      state,
      action: PayloadAction<{photos:Photo[] | Video[], initial?:boolean}>,
    ) => {
      state.galleryImages = action.payload.photos
      if(action.payload.initial)
        state.initalDispatch = true;
    },
    setVisibleRange: (
      state,
      action: PayloadAction<VisibleRange>,
    ) => {
      // console.info('setVisibleRange', action.payload)
      state.visibleRange = action.payload
      state.visiblePhotos = state.galleryImages.slice(state.visibleRange.start, state.visibleRange.end)
      // console.info('')
    },
  },
});

export const {setGallery, setVisibleRange} =
  GallerySlice.actions;

export default GallerySlice.reducer;
