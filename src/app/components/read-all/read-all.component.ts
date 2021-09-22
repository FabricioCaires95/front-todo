import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  todoClosed = 0;
  list: Todo[] = [];
  closeTodoList: Todo[] = [];
  pageIndex = 0;
  pageSize = 3;
  length = 9;


  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.list.length)
    this.findAll();
  }

  findAll(): void {
    this.service
        .findPageable(this.pageIndex, 3, false)
        .subscribe((response) => {
            this.list = response["content"];
        });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAll();
  }

  finishTask(item: Todo): void {
    item.isFinished = true;
    this.service.update(item)
        .subscribe(() => {
          this.service.message('Task finished successfully')
          this.list = this.list.filter(todo => todo.id !== item.id);
          this.todoClosed++;
        });
  }


  delete(id: any): void {
    this.service.delete(id)
        .subscribe((response => {
          if (response == null) {
            this.service.message('Todo has been removed successfully')
            this.list = this.list.filter(todo => todo.id !== id);
          }
        }))
  }

  toFinishTodo(): void {
    this.router.navigate(['finished'])
  }

  toCreateNewTaskPage(): void {
    this.router.navigate(['create'])
  }

  editTask(): void {
    
  }

}
