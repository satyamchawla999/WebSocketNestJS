import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type RootState } from '../../app/store'
import { addUser, signIn } from './actionCreator'

export interface User {
  _id?: string
  name?: string
  email?: string
  password?: string
  createdDate?: Date
}

export interface initialStateData {
  users: User[]
  currentUser: User | null
  token: string | null
}

const initialState: initialStateData = {
  users: [],
  currentUser: null,
  token: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.fulfilled,
        (state, { payload }) => {
          const data: User | undefined = payload
          console.log("useSlice data", typeof (data));
          console.log("useSlice payload", typeof (payload));
          if (data !== undefined) {
            state.users.push(data)
          }
        })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.currentUser = payload.user
        state.users = payload.allUsers
        state.token = payload.token
      })
  }
})

// eslint-disable-next-line no-empty-pattern
export const { addNewUser } = userSlice.actions
export const userSelector = (state: RootState) => state.persistedReducer.userReducer.users
export const currentUserSelector = (state: RootState) => state.persistedReducer.userReducer.currentUser

export default userSlice.reducer
