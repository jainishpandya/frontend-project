import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/userSlice'
import clubSlice from './slices/club/clubSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    club: clubSlice
  },
})

