import { auth,db } from "@/utils/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useAuthUser() {
const[user] = useAuthState(auth);

useEffect(() => {
    if (user) {
        //"users"(collection) -> "user.uid"(document) -> "user"(data)
     const userRef = doc(db, `users/${user.uid}`);
     getDoc(userRef).then((snapshot) =>{
            if (!snapshot.exists()) {
            setDoc(snapshot.ref, {
                name: user.displayName,
                photoURL: user.photoURL,
                timestamp: serverTimestamp(),
            })
            }
     }) 
    }
},[user]);

return user;

}