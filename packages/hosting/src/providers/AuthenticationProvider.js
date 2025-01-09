import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { isError, isObject } from "lodash";
import { notification, Spinner } from "../components";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { usersRef } from "../firebase/collections";
import { authPersistence } from "../firebase/auth";
import { Roles } from "../data-list";

const AuthenticationContext = createContext({
  authUser: null,
  loginWithEmailAndPassword: () =>
    Promise.reject("Unable to find AuthenticationProvider."),
  logout: () => Promise.reject("Unable to find AuthenticationProvider."),
  loginLoading: false,
});

export const useAuthentication = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
  const [loginLoading, setLoginLoading] = useState(false);

  const { firebaseUser, firebaseUserLoading } = useFirebaseUser();

  const [user, userLoading, userError] = useDocumentData(
    firebaseUser ? usersRef.doc(firebaseUser.uid) : null,
  );

  const authLoading = firebaseUserLoading || userLoading;
  const authError = userError;
  const authEmptyData = !user;

  const authUser =
    !authLoading && !authError && !authEmptyData ? mapAuthUser(user) : null;

  useEffect(() => {
    authError && logout();
  }, [authError]);

  useEffect(() => {
    if (isAuthUserError(authUser)) {
      notification({ type: "warning", title: authUser.message });

      logout();
    }
  }, [JSON.stringify(authUser)]);

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      setLoginLoading(true);

      await auth.setPersistence(authPersistence.LOCAL);
      await auth.signInWithEmailAndPassword(email, password);

      setLoginLoading(false);
    } catch (e) {
      const error = isError(e) ? e : undefined;

      notification({
        type: "error",
        title: "Login error",
        description: error?.message,
      });

      setLoginLoading(false);
    }
  };

  const logout = async () => {
    sessionStorage.clear();
    localStorage.clear();

    return auth.signOut();
  };

  if (authLoading && location.pathname !== "/login")
    return <Spinner fullscreen />;

  return (
    <AuthenticationContext.Provider
      value={{
        authUser: isAuthUser(authUser) ? authUser : null,
        loginWithEmailAndPassword,
        logout,
        loginLoading: loginLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useFirebaseUser = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseUserLoading, setFirebaseUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setFirebaseUserLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { firebaseUser, firebaseUserLoading };
};

const mapAuthUser = (user) => {
  const authUserRole = findAuthUserRole(user);

  if (!authUserRole) return mapAuthUserError("You don't have an assigned role");

  return {
    ...user,
    role: authUserRole,
  };
};

const mapAuthUserError = (message) => ({
  type: "error",
  message,
});

const isAuthUser = (data) => isObject(data) && "id" in data;

const isAuthUserError = (data) =>
  isObject(data) && "type" in data && data.type === "error";

const findAuthUserRole = (user) =>
  Roles.find((role) => role.id === user.roleCode);
