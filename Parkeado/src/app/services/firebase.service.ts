import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { User } from '../models/user.module';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //Autenticación
  getAuth(){
    return getAuth();
  }

  //Acceder
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //Crear Usuario
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //Actualizar Usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, {displayName})
  }

  //Enviar email para restablecer contraseña
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }


  //Base de Datos
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }

  //Obtener un documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}
