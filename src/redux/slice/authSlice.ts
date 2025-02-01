import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { AppThunk } from "../store";
import { auth, db } from "@/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  photoPath: string | null;
  isAdmin: boolean;
  description?: string;
  updatedAt?: any;
};

interface AuthState {
  user: UserType | null;
  users: UserType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  users: null,
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserType[] | null>) => {
      state.users = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setLoading, setError, setUser, setUsers, clearUser } =
  authSlice.actions;

export default authSlice.reducer;

// Async Thunks
export const registerUser =
  (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData: UserType = {
        id: user.uid,
        firstname,
        lastname,
        email: user.email || "",
        isAdmin: false,
        photo: user.photoURL || "",
        photoPath: null,
        description: ""
      };

      await setDoc(doc(db, "users", user.uid), userData);
      dispatch(setUser(userData));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const loginUser =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        dispatch(setUser(userDoc.data() as UserType));
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const loginWithGoogle = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData: UserType = {
      id: user.uid,
      firstname: user.displayName?.split(" ")[0] || "",
      lastname: user.displayName?.split(" ")[1] || "",
      email: user.email || "",
      isAdmin: false,
      photo: user.photoURL || "",
      photoPath: null,
      description: ""
    };

    await setDoc(doc(db, "users", user.uid), userData, { merge: true });
    dispatch(setUser(userData));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkAuthState = (): AppThunk => (dispatch) => {
  dispatch(setLoading(true));
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        dispatch(setUser(userDoc.data() as UserType));
      }
    } else {
      dispatch(clearUser());
    }
    dispatch(setLoading(false));
  });
};

export const formatUserData = (data: any): any => {
  if (data === null || data === undefined) return data;

  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => formatUserData(item));
  }

  if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, formatUserData(value)])
    );
  }

  return data;
};

export const getUserData = (): AppThunk => (dispatch) => {
  dispatch(setLoading(true));

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const formattedUser = formatUserData(userDoc.data());
          dispatch(setUser(formattedUser as UserType));
        }
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setUser(null));
      dispatch(setLoading(false));
    }
  });
};

export const getUsers = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const userCollection = await getDocs(collection(db, "users"));
    const usersData = userCollection.docs.map((doc) =>
      formatUserData({ ...doc.data(), id: doc.id })
    ) as UserType[];

    dispatch(setUsers(usersData));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
