import { Component, OnInit } from '@angular/core';
import { Todo, AuthService } from './../auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  todos: Todo[];

  constructor(private todoService: AuthService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(resolve => {
      this.todos = resolve;
    });
  }

  delete(item) {
    this.todoService.deleteTodo(item.id);
  }
}
