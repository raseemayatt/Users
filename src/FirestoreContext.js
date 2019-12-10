import React, { createContext, useEffect, useState } from "react";
import * as firebase from "firebase";
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAIxdQxf_SjSXTPLbD5q_mfZUu3nfndYW0",
  authDomain: "test-9b2ce.firebaseapp.com",
  databaseURL: "https://test-9b2ce.firebaseio.com",
  projectId: "test-9b2ce",
  storageBucket: "test-9b2ce.appspot.com",
  messagingSenderId: "274205104921",
  appId: "1:274205104921:web:701caa260ef9a20a4ac388"
};

export const FirestoreContext = createContext(null);

export default function FirestoreContextProvider({ children }) {
  const [firestore, setFirestore] = useState(null);
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const dbh = firebase.firestore();
    setFirestore(dbh);
  }, []);
  return (
    <FirestoreContext.Provider value={firestore}>
      {children}
    </FirestoreContext.Provider>
  );
}