import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

//função do registro
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
}

//Register am user and sign in = Registra um usuario e faz login
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    const data = await authService.register(user)

    //check for errors - checagem de erros

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }
    return data
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

//Sign ins a user - entrada de um usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  const data = await authService.login(user)

  //check for errors - checagem de erros

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0])
  }
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = false
      state.success = false
    },
  },
  //parte das execuçoes que é feita na api
  //(builder = construtor que cria açoes separadamente)
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = null
        state.success = false
        state.error = true
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = null
      })
      
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
