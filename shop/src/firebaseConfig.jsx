import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCGfDCRl564Sn1yz8DvccRyeovclzb8VrE",
  authDomain: "finalproject-b7aa3.firebaseapp.com",
  projectId: "finalproject-b7aa3",
  storageBucket: "finalproject-b7aa3.appspot.com",
  messagingSenderId: "303752842091",
  appId: "1:303752842091:web:fe4f3f140b902c5034da2e"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)