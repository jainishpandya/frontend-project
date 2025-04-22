import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: -1,
    name: '',
    email: '',
    phone_no: '',
    profile_image: '',
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.phone_no = action.payload.phone_no,
            state.profile_image = action.payload.profile_image,
            state.isLoggedIn = true;
        },
        // logout: (state) => {
        //     state.id = -1;
        //     state.name = '',
        //     state.email = '',
        //     state.phone_no = -1,
        //     state.profile_image = '',
        //     state.isLoggedIn = false;
        // },
        logout: () => initialState,
    },
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 