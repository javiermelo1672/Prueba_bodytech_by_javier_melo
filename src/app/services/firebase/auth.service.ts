import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth) { }
  IniciarSesion(email:string,password:string)
  {
     
     
       return this.afAuth.signInWithEmailAndPassword(email,password);

  }

  registrarusuario(email:string,password:string){

    return this.afAuth.createUserWithEmailAndPassword(email,password);
  }
  
  
  CerrarSesion()
  {
     return this.afAuth.signOut();     
    
     
  }
}
