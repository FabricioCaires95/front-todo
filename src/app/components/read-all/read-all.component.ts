import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  todoClosed = 0;
  list: Todo[] = []

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service
        .findAll()
        .subscribe((response)=> {
          this.list = response;
          this.countTodoClosed();
        })
  }

  countTodoClosed(): void {
    this.list.filter(todo => {
      todo.status ? this.todoClosed++: 0;
    })
  }

}
