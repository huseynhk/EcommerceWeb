import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
//email
import {getAuth} from 'firebase/auth';
//image
import {getStorage} from "firebase/storage"


// const firebaseConfig = {
//   apiKey: "AIzaSyCGfDCRl564Sn1yz8DvccRyeovclzb8VrE",
//   authDomain: "finalproject-b7aa3.firebaseapp.com",
//   projectId: "finalproject-b7aa3",
//   storageBucket: "finalproject-b7aa3.appspot.com",
//   messagingSenderId: "303752842091",
//   appId: "1:303752842091:web:fe4f3f140b902c5034da2e"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAEs5PG532uCNDIjmmjxj0wzmhx2uCENTs",
  authDomain: "final-d783c.firebaseapp.com",
  projectId: "final-d783c",
  storageBucket: "final-d783c.appspot.com",
  messagingSenderId: "793792047502",
  appId: "1:793792047502:web:b0b4eb0192cd4b42bd1cdf"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
//email
const auth = getAuth(app);
//image
const storage = getStorage(app)

export {fireDB, auth, storage}
// project-793792047502


