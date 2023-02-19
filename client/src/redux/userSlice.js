import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null },
    reducers: {
        setUser(state, action) {
            // return action.payload;
            state.user = action.payload;
        },
        clearUser(state) {
            // return { state.user: null};
            state.user = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
