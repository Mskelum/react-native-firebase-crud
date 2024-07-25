// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-3mm1ivKnfrkqoXgehc7lr_f6U4EflZI",
    authDomain: "stmanager-d3bbc.firebaseapp.com",
    projectId: "stmanager-d3bbc",
    storageBucket: "stmanager-d3bbc.appspot.com",
    messagingSenderId: "936235120433",
    appId: "1:936235120433:web:0b607cb7a78cb9fbb82210"
};

// Initialize Firebase
// let app;

// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
