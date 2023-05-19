import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  isLoading,
  noteUpdated,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading(true));

    const { uid } = getState().auth;

    const newNote = {
      title: "New note",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    const resp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    dispatch(isLoading(false));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading(true));
    const { uid } = getState().auth;

    const notes = await loadNotes(uid);

    dispatch(isLoading(false));
    dispatch(setNotes(notes));
  };
};

export const startUpdatingNote = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading(true));

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const updatedNote = {
      ...note,
    };
    delete updatedNote.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    const resp = await setDoc(docRef, updatedNote);

    dispatch(isLoading(false));

    if (resp) throw new Error(resp);

    dispatch(noteUpdated(note));
  };
};

export const startUploadingFiles = (files) => {
  return async (dispatch) => {
    dispatch(isLoading(true));

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const imagesURLs = await Promise.all(fileUploadPromises);

    dispatch(setImagesToActiveNote(imagesURLs));

    dispatch(isLoading(false));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading(true));
    const { uid } = getState().auth;
    const { id } = getState().journal.active;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);

    const resp = await deleteDoc(docRef);
    dispatch(isLoading(false));
    dispatch(deleteNoteById(id));

    if (resp) throw new Error(resp);
  };
};
