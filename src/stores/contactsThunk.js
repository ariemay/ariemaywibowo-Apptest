import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {Request} from '../utils/Interfaces';
import {api} from '../helpers/api';

// First, create the thunk
const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (req: Request, thunkAPI) => {
        await api(req, (v) => {
            return v.data
        })
    }
)

interface UsersState {
    entities: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    entities: [],
    loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
        })
    },
})
