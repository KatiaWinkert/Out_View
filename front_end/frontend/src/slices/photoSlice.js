import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import photoService from '../services/photoService'

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
}

//Publish user photo:
export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.publishPhoto(photo, token)

    console.log(data.errors)
    //check error
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data
  }
)

// -> Get user photos
export const getUserphotos = createAsyncThunk(
  'photo/userphotos',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.getUserphotos(id, token)

    return data
  }
)

export const photoSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload
        state.photos.unshift(state.photo)
        state.message = 'Foto publicada com sucesso!'
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.photo = {}
      })
      .addCase(getUserphotos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserphotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload

      })
  },
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer
