import { Component, OnInit } from '@angular/core';
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

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service
        .findPageable()
        .subscribe((response) => {
            this.list = response["content"];
        });
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
