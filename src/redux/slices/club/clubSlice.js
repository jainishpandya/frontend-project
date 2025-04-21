import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: -1,
    club_name: '',
    club_contact_email: '',
    club_thumbnail_url: '',
    club_location: '',
    club_status: false,
    created_at: '',
    isClubin: false
}

export const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        clubin: (state, action) => {
                state.id = action.payload.id
                state.club_name = action.payload.club_name,
                state.club_contact_email = action.payload.club_contact_email,
                state.club_thumbnail_url = action.payload.club_thumbnail_url,
                state.club_location = action.payload.club_location,
                state.club_status = action.payload.club_status,
                state.created_at = action.payload.createdAt,
                state.isClubin = true;
        },
        clubout: (state) => {
                state.id = -1,
                state.club_name = '',
                state.club_contact_email = '',
                state.club_thumbnail_url = '',
                state.club_location = '',
                state.club_status = false,
                state.created_at = '',
                state.isClubin = false
        },
    },
})

export const { clubin, clubout } = clubSlice.actions;
export default clubSlice.reducer; 