import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  findAll(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl + '/all')
  }

  ///todo/all?page=2&size=5&isFinished=true
  findPageable(page = 0, size = 3, isFinished = false): Observable<any> {
     return this.http.get(`${this.baseUrl}/all?page=${page}&pageSize=${size}&isFinished=${isFinished}`)

  }

  update(newItem: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/update`, newItem);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  create(newTask: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/create`, newTask);
  }


  message(msg: string): void {
    this.snackbar.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    });
  }

  dateFormatter(date: Date): string {
    return `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}
