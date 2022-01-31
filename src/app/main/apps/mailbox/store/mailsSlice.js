import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMails = createAsyncThunk(
  'mailboxApp/mails/getMails',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().mailboxApp.mails.routeParams;

    let url = '/api/mailbox/mails/';
    if (routeParams.folderHandle) {
      url += routeParams.folderHandle;
    }

    if (routeParams.labelHandle) {
      url += `labels/${routeParams.labelHandle}`;
    }

    if (routeParams.filterHandle) {
      url += `filters/${routeParams.filterHandle}`;
    }
    console.info(url);
    const response = await axios.get(url);
    const data = await response.data;

    return { data, routeParams };
  }
);

export const setFolderOnSelectedMails = createAsyncThunk(
  'mailboxApp/mails/setFolderOnSelectedMails',
  async (id, { dispatch, getState }) => {
    const { selectedMailIds } = getState().mailboxApp.mails;

    const response = await axios.post('/api/mail-app/set-folder', {
      selectedMailIds,
      folderId: id,
    });
    const data = await response.data;

    dispatch(getMails());

    return data;
  }
);

export const toggleLabelOnSelectedMails = createAsyncThunk(
  'mailboxApp/mails/toggleLabelOnSelectedMails',
  async (id, { dispatch, getState }) => {
    const { selectedMailIds } = getState().mailboxApp.mails;

    const response = await axios.post('/api/mail-app/toggle-label', {
      selectedMailIds,
      labelId: id,
    });
    const data = await response.data;

    dispatch(getMails());

    return data;
  }
);

const mailsAdapter = createEntityAdapter({});

export const { selectAll: selectMails, selectById: selectMailById } = mailsAdapter.getSelectors(
  (state) => state.mailboxApp.mails
);

const mailsSlice = createSlice({
  name: 'mailboxApp/mails',
  initialState: mailsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    selectedMailIds: [],
  }),
  reducers: {
    setMailsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    selectAllMails: (state, action) => {
      state.selectedMailIds = state.ids;
    },
    deselectAllMails: (state, action) => {
      state.selectedMailIds = [];
    },
    selectMailsByParameter: (state, action) => {
      const [parameter, value] = action.payload;
      state.selectedMailIds = state.ids.filter((id) => state.entities[id][parameter] === value);
    },
    toggleInSelectedMails: (state, action) => {
      const mailId = action.payload;
      state.selectedMailIds = state.selectedMailIds.includes(mailId)
        ? state.selectedMailIds.filter((id) => id !== mailId)
        : [...state.selectedMailIds, mailId];
    },
  },
  extraReducers: {
    [getMails.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      mailsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.selectedMailIds = [];
    },
  },
});

export const {
  setMailsSearchText,
  selectAllMails,
  deselectAllMails,
  selectMailsByParameter,
  toggleInSelectedMails,
} = mailsSlice.actions;

export default mailsSlice.reducer;
