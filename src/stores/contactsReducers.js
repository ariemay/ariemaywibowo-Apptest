import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  fetchDeleteContact,
  fetchSaveContact,
  fetchSpecificUser,
  fetchUpdateContact,
} from './contactsThunk';

const initialState = {
  contacts: [],
  detailContact: {},
  loading: 'idle',
};

// Then, handle actions in your reducers:
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.loading = true;
    },
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.contacts = payload.data;
      state.loading = false;
    },
    [fetchContacts.rejected]: state => {
      state.loading = false;
    },
    [fetchSaveContact.pending]: state => {
      state.loading = true;
    },
    [fetchSaveContact.fulfilled]: state => {
      state.loading = false;
    },
    [fetchSaveContact.rejected]: state => {
      state.loading = false;
    },
    [fetchUpdateContact.pending]: state => {
      state.loading = true;
    },
    [fetchUpdateContact.fulfilled]: state => {
      state.loading = false;
    },
    [fetchUpdateContact.rejected]: state => {
      state.loading = false;
    },
    [fetchDeleteContact.pending]: state => {
      state.loading = true;
    },
    [fetchDeleteContact.fulfilled]: (state, { payload }) => {
      let filtered = state.contacts.filter(v => v.id !== payload.id);
      state.contacts = filtered;
      state.loading = false;
    },
    [fetchDeleteContact.rejected]: state => {
      state.loading = false;
    },
    [fetchSpecificUser.pending]: state => {
      state.loading = true;
    },
    [fetchSpecificUser.fulfilled]: (state, { payload }) => {
      state.detailContact = payload.data;
      state.loading = false;
    },
    [fetchSpecificUser.rejected]: state => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading } = contactsSlice.actions;

export default contactsSlice.reducer;
