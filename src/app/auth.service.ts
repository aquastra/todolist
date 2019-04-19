import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angfireAuth:AngularFireAuth) { }

  register(email:string, password: string){
    return new Promise( (resolve, reject ) => {
      this.angfireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then ( response => { resolve ( response )} )
      .catch ( error => { reject ( error )} )
    });
  }

  login(email:string, password:string){
    return new Promise( ( resolve, reject ) => {
      this.angfireAuth.auth.signInWithEmailAndPassword(email, password)
      .then ( response => {  resolve (response)} )
      .catch ( error => { reject (error)} )
    });
  }

  logout(){
    return new Promise( (resolve, reject) => {
      this.angfireAuth.auth.signOut()
      .then ( () => {resolve (true)} )
      .catch ( error => { reject (error)} )
    });
  }
}
