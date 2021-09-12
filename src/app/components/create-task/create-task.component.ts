import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  todo: Todo = {
    title: '',
    description: '',
    deadline: new Date(),
    status: true
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  createTodo(): void {
    this.dateFormatter();
    this.service
      .create(this.todo)
      .subscribe((response) => {
        this.service.message("Task created!");
        this.router.navigate(['']);
      }, err => {
        this.service.message("Error creating task!");
        this.router.navigate(['']);
      });
      
  }

  cancel(): void {
    this.router.navigate([''])
  }

  dateFormatter(): void {
    let date = new Date(this.todo.deadline);
    this.todo.deadline = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`
  }

}
