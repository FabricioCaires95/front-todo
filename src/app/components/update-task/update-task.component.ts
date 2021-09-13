import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  newTask: Todo = {
    id: history.state.id,
    title: history.state.title,
    description: history.state.description,
    deadline: history.state.deadline,
    status: history.state.status
  };


  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.newTask);
  }

}
