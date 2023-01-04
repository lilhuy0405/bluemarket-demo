// Import the functions you need from the SDKs you need

import {initializeApp} from "firebase/app";

import {getAnalytics} from "firebase/analytics";
import firebase from "firebase/compat";

// import storage from "firebase/storage";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";


class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    if (!firebase.apps.length) {
      const firebaseConfig = {

        apiKey: "AIzaSyBcKBLIaU5hd5udUtFrAckm4eerD9GGjgM",

        authDomain: "spores-internship.firebaseapp.com",

        projectId: "spores-internship",

        storageBucket: "spores-internship.appspot.com",

        messagingSenderId: "680777121188",

        appId: "1:680777121188:web:1fd0afbe2f383d2c749531",

        measurementId: "G-G05GX9BNN8"

      };

      const app = initializeApp(firebaseConfig);

      const analytics = getAnalytics(app);
    }
  }

  uploadImage = async (file: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${file.name}`)
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
}


export default Fire;
