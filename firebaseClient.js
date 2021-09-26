import { initializeApp, getApps } from "firebase/app";

const FIREBASE_CONFIG = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  // measurementId: process.env.measurementId,
};

export default function firebaseClient() {
  // console.log(FIREBASE_CONFIG);

  if (!getApps().length) {
    initializeApp(FIREBASE_CONFIG);
  }
}
