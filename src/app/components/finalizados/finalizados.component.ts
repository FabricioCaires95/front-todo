import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  closeTodoList: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service
        .findAll()
        .subscribe((response)=> {          
          this.closeTodoList = response.filter(todo => !todo.status);
        });
  }

  backToOpenTodo(): void {
    this.router.navigate([''])
  }

}