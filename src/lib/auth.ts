import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';


export const loginAdmin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};


export const registerAdmin = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ajouter les informations utilisateur dans Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin', // Rôle par défaut
      approved: false,
      verified: false, // Compte non vérifié par défaut
    });

    alert("L'administrateur a été inscrit avec succès !");
    return true;
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    return false;
  }
};

export const approveAdmin = async (adminId: string) => {
  try {
    await updateDoc(doc(db, "users", adminId), {
      approved: true, // Change l'état à approuvé
    });
    alert("L'administrateur a été approuvé !");
  } catch (error) {
    console.error("Erreur lors de l'approbation :", error);
    alert("Erreur lors de l'approbation.");
  }
};



// export const registerAdmin = async (email: string, password: string) => {
//   const auth = getAuth();
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Ajouter l'utilisateur dans Firestore
//     await setDoc(doc(db, 'users', user.uid), {
//       email: user.email,
//       role: 'admin', // Attribuer un rôle par défaut
//     });

//     return true;
//   } catch (error) {
//     console.error('Erreur lors de l’inscription :', error);
//     return false;
//   }
// };

