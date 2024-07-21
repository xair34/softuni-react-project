import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCaffw75wBdb3xT2WqPzAAUMQ0bSse9FO4",
  authDomain: "https://softuni-discussion-forum-default-rtdb.europe-west1.firebasedatabase.app/",
  databaseURL: "https://softuni-discussion-forum-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "820658082581",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
