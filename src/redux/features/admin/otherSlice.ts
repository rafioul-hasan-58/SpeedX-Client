import { createSlice } from "@reduxjs/toolkit";


interface ISearchState {
    search: string
}

const initialState: ISearchState = {
    search: ''
}
const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})
export const { setSearch } = otherSlice.actions;
export default otherSlice.reducer;