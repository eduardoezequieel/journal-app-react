import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUser,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearOnLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const startLoginWithEmailAndPassword = (user) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPassword(user);

    const { ok, errorMessage } = result;

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login(result));
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    const { ok, errorMessage } = result;

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login(result));
  };
};

export const startCreatingUser = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUser({
      email,
      password,
      displayName,
    });

    const { ok, errorMessage } = result;
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearOnLogout());
    dispatch(logout());
  };
};
