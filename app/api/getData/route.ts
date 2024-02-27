
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
export async function GET() { 
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const newsDoc = doc(firestore, "posts", "as2ZbcQGlegVcuwniYIg");
  const snap = await getDoc(newsDoc);
  if (!snap.exists()) { return NextResponse.json({ status: 500 }) };
  const data = snap.data();
  return NextResponse.json(data);

}
const firebaseConfig = {
  apiKey: "AIzaSyDPbq4roPs-O2fKuSDDKbSUO0wJUScRpNA",
  authDomain: "risosenterprisesnews.firebaseapp.com",
  projectId: "risosenterprisesnews",
  storageBucket: "risosenterprisesnews.appspot.com",
  messagingSenderId: "719277048385",
  appId: "1:719277048385:web:c2d1c6894d51edf58c3cc0",
  measurementId: "G-YV5LJL3GC2"
};

