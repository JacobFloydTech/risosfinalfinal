'use server'


import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPbq4roPs-O2fKuSDDKbSUO0wJUScRpNA",
    authDomain: "risosenterprisesnews.firebaseapp.com",
    projectId: "risosenterprisesnews",
    storageBucket: "risosenterprisesnews.appspot.com",
    messagingSenderId: "719277048385",
    appId: "1:719277048385:web:c2d1c6894d51edf58c3cc0",
    measurementId: "G-YV5LJL3GC2"
  };

  
export async function getData() { 
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const newsDoc = doc(firestore, "posts", "as2ZbcQGlegVcuwniYIg");
    const data = await getDoc(newsDoc);
    if (data.exists()) { 
        const {posts} = data.data()
        return {posts};
    } else { 
        return [];
    }
}
