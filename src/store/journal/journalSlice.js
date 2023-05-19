import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      state.notes.unshift(payload);
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
    },
    setImagesToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
    },
    isLoading: (state, { payload }) => {
      state.isLoading = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload.sort((a, b) => b.date - a.date);
    },
    noteUpdated: (state, { payload: updatedNote }) => {
      state.notes = state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );

      state.messageSaved = `${updatedNote.title} saved correctly!`;
    },
    clearOnLogout: () => {
      return initialState;
    },
    deleteNoteById: (state, { payload: id }) => {
      state.messageSaved = `${state.active.title} deleted correctly!`;
      state.notes = state.notes.filter((note) => note.id !== id);
      state.active = null;
    },
    unsetActiveNote: (state) => {
      state.active = null;
    },
  },
});
export const {
  addNewEmptyNote,
  clearOnLogout,
  deleteNoteById,
  isLoading,
  noteUpdated,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  unsetActiveNote,
} = journalSlice.actions;
