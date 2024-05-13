import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firbase.js";
const AuthContex = React.createContext();
export function useAuth() {
  return useContext(AuthContex);
}
export function AuthProvider({ children }) {
  const [loding, setLoding] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const auth = getAuth();
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoding(false);
    });
    return unSuscribe;
  }, []);
  /* sign up function start */
  async function signUp(email, password, userName) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    //  update profile
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }
  /* sign up function end */
  /* log in function start */
  function logIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }
  /* log in function end */
  /* log out function start */
  function logOut() {
    const auth = getAuth();
    return signOut(auth);
  }
  /* log out function end */
  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
  };
  return (
    <AuthContex.Provider value={value}>
      {!loding && children}
    </AuthContex.Provider>
  );
}
