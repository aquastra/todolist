import { Component, OnInit } from '@angular/core';
import { Todo, AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  todos: Todo[];

  constructor(private todoService: AuthService,
    private angfireAuth:AngularFireAuth) {}

  async ngOnInit() {
    let user = this.angfireAuth.auth.currentUser;
    if(user){
    this.todoService.getTodos().subscribe(resolve => {
      this.todos = resolve;
    });
    }
    else{

    }
  }

  delete(item) {
    this.todoService.deleteTodo(item.id);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
