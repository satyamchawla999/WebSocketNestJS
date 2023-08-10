import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from './usersSlice'
import axios from 'axios'


export const addUser = createAsyncThunk(
  'users/addUser', async (userData: User) => {
    try {
      const response = await axios.post('http://localhost:3001/user/signup', userData);
      return response.data.newUser;
    } catch (err) {
      console.log(err)
    }
  }
)

export const signIn = createAsyncThunk(
  'users/signIn', async (userData: User) => {
    try {
      const response = await axios.post('http://localhost:3001/user/signin', userData);
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }
)

// export const addCurrentUser = createAsyncThunk(
//   'users/addCurrentUser', async (userData: User) => {
//     console.log(userData)
//   }
// )
