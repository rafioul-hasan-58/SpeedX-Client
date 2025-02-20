import { createSlice } from '@reduxjs/toolkit';

const initialState: { searchTerm: string } = {
    searchTerm: ''
};

const userSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
    },
});

export const { setSearchTerm } = userSlice.actions
export default userSlice.reducer;

