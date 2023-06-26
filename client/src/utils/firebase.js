import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyB0-X_YQW9qpBsPA2TZN0BI__onn5MAdg4",
    authDomain: "thgpainting-276dd.firebaseapp.com",
    projectId: "thgpainting-276dd",
    storageBucket: "thgpainting-276dd.appspot.com",
    messagingSenderId: "111535948642",
    appId: "1:111535948642:web:797ee1f5236ab04633223b",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)

export function useFileUpload() {
    const storage = getStorage(firebaseApp);

    const fileUpload = async (file, storageRefPath) => {
        const metadata = {
            contentType: file.type,
        };

        // Check if user is authenticated
        const currentUser = auth.currentUser;
        if (!currentUser) {
            try {
                // Sign in the user anonymously
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Error signing in anonymously:", error);
                throw new Error("User not authenticated and could not sign in anonymously.");
            }
        }

        const storageRef = ref(storage, storageRefPath);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("downloadURL:", downloadURL)

        return downloadURL;
    };

    const deleteFile = async (url) => {
        try {
          const storageRef = ref(storage, url);
          await deleteObject(storageRef);
          console.log(`File at URL ${url} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting file at URL ${url}:`, error);
          throw new Error(`Error deleting file at URL ${url}: ${error.message}`);
        }
    };

    return { fileUpload, storage, deleteFile };
}