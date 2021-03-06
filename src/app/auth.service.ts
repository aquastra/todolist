import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo{
  task: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private todoCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(private angfireAuth:AngularFireAuth,
    private db:AngularFirestore,
    ) { 
      let user = this.angfireAuth.auth.currentUser;
      if(user){
      this.todoCollection = db.collection<Todo>(user.email.toString());
      //this.todoCollection = db.collection<Todo>(angfireAuth.auth.currentUser.email); no longer works

      this.todos = this.todoCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        })
      );
      }
      else{
        //not signed in
        
      }

      
    }

    getUserId(){
      return this.angfireAuth.auth.currentUser.email;
    }

    getTodos(){
      return this.todos;
    }

    getTodo(id){
      return this.todoCollection.doc<Todo>(id).valueChanges();
    }

    updateTodo(todo: Todo, id: string){
      return this.todoCollection.doc(id).update(todo);
    }

    addTodo(todo: Todo){
      return this.todoCollection.add(todo);
    }

    deleteTodo(id){
      return this.todoCollection.doc(id).delete();
    }

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
