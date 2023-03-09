import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {
  photos: [],
  photos: {},
  error: false,
  success: false,
  loading: false,
  message: null,
}

//funções:

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducer: {
    resetMessage: (state) => {
      state.message = null
    },
  },
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer
