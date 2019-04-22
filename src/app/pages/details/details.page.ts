import { Component, OnInit } from '@angular/core';
import { Todo, AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  todo: Todo = {
    task: '',
    createdAt: new Date().getTime()
  }

  todoId = null;

  constructor(private todoService: AuthService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId){
      this.loadTodo();
    }
    else{

    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'loading todo'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe( resolve => {
      loading.dismiss();
      this.todo = resolve;
    });
  }

  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'saving todo'
    });
    await loading.present();

    if(this.todoId){
      this.todoService.updateTodo(this.todo, this.todoId).then ( () => {
        loading.dismiss();
        this.navController.back();
      });
    }
    else{
      this.todoService.addTodo(this.todo).then( () => {
        loading.dismiss();
        this.navController.back();
      });
    }
  }

}
