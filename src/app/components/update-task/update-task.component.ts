import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  todo: Todo = {
    id: history.state.id,
    title: history.state.title,
    description: history.state.description,
    deadline: history.state.deadline,
    status: history.state.status
  };

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  update(todo: Todo): void {
    this.todo.deadline = this.service.dateFormatter(todo.deadline);
    this.service.update(this.todo)
      .subscribe((response) => {
        this.service.message('Task Updated!');
        this.todo = response;
        this.navigateToReadAllPage();
      }, err => {
        this.service.message("Error updating task!");
        this.navigateToReadAllPage();
      });
  }

  navigateToReadAllPage() {
    this.router.navigate([''])
  }




}
