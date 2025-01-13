import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface SearchState {
  query?: string
}

const initialState: SearchState = {
  query:undefined
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.query = action.payload
    },
    
  },
});

export const {setQuery} =
  SearchSlice.actions;

export default SearchSlice.reducer;
