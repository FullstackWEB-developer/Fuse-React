import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ContactModel from 'app/main/apps/contacts/model/ContactModel';
import history from '@history/@history';

export const getContact = createAsyncThunk(
  'contactsApp/contact/getContact',
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`/api/apps/contacts/contacts/${id}`);

      const data = await response.data;

      return data;
    } catch (error) {
      history.push({ pathname: `/apps/contacts` });

      return null;
    }
  }
);

export const addContact = createAsyncThunk(
  'contactsApp/contacts/addContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.post('/api/apps/contacts/contacts', contact);

    const data = await response.data;

    return data;
  }
);

export const updateContact = createAsyncThunk(
  'contactsApp/contacts/updateContact',
  async (contact, { dispatch, getState }) => {
    const response = await axios.put(`/api/apps/contacts/contacts/${contact.id}`, contact);

    const data = await response.data;

    return data;
  }
);

export const removeContact = createAsyncThunk(
  'contactsApp/contacts/removeContact',
  async (id, { dispatch, getState }) => {
    const response = await axios.delete(`/api/apps/contacts/contacts/${id}`);

    await response.data;

    return id;
  }
);

export const selectContact = ({ contactsApp }) => contactsApp.contact;

const contactSlice = createSlice({
  name: 'contactsApp/contact',
  initialState: null,
  reducers: {
    newContact: (state, action) => ContactModel(),
    resetContact: () => null,
  },
  extraReducers: {
    [getContact.pending]: (state, action) => null,
    [getContact.fulfilled]: (state, action) => action.payload,
    [updateContact.fulfilled]: (state, action) => action.payload,
    [removeContact.fulfilled]: (state, action) => null,
  },
});

export const { resetContact, newContact } = contactSlice.actions;

export default contactSlice.reducer;
