import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface SearchState {
  query?: string
  searchState: "init" | "loaded"
}

const initialState: SearchState = {
  query:undefined,
  searchState: "init"
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
    setSearchState: (
      state,
      action: PayloadAction<"init" | "loaded">,
    ) => {
      state.searchState = action.payload
    },
    
  },
});

export const {setQuery, setSearchState} =
  SearchSlice.actions;

export default SearchSlice.reducer;
