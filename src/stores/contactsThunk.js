import { createAsyncThunk } from '@reduxjs/toolkit';
import { Request } from '../utils/Interfaces';
import { api } from '../helpers/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (param: Request, thunkAPI) => {
    const response = await api(param);
    return response;
  },
);

export const fetchSaveContact = createAsyncThunk(
  'contacts/fetchSaveContacts',
  async (param: Request, thunkAPI) => {
    const response = await api(param);
    return response;
  },
);

export const fetchUpdateContact = createAsyncThunk(
  'contacts/fetchUpdateContact',
  async (param: Request, thunkAPI) => {
    const response = await api(param);
    return response;
  },
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/fetchDeleteContact',
  async (param: Request, thunkAPI) => {
    const response = await api(param);
    return response;
  },
);

export const fetchSpecificUser = createAsyncThunk(
  'contacts/fetchSpecificUser',
  async (param: Request, thunkAPI) => {
    const response = await api(param);
    return response;
  },
);
