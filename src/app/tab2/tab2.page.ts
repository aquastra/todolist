import { Component, OnInit } from '@angular/core';
import { Todo, AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  todos: Todo[];

  constructor(private todoService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {

    this.todoService.getTodos().subscribe(resolve => {
      this.todos = resolve;
    });
    
  }

  delete(item) {
    this.todoService.deleteTodo(item.id);
  }

  goEdit(item){
    this.router.navigate(['/details', item]);
  }

  changeStatus(item){
    item.status = (item.status == false) ?true : false;
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      
      event.target.complete();
    }, 2000);
  }
}
