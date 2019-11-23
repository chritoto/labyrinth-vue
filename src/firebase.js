import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyB8lo0Co4Lx5bLT5Joj8ttScFv3qfbV3ZQ",
  authDomain: "lessouinceuxdesauce-3808f.firebaseapp.com",
  databaseURL: "https://lessouinceuxdesauce-3808f.firebaseio.com",
  projectId: "lessouinceuxdesauce-3808f",
  storageBucket: "lessouinceuxdesauce-3808f.appspot.com",
  messagingSenderId: "85801734174",
  appId: "1:85801734174:web:a7b1ca40610b958e581e0f"
});

export const db = app.firestore();
export const todosCollection = db.collection('todos');