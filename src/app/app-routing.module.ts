import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FinalizadosComponent } from './components/finalizados/finalizados.component';
import { ReadAllComponent } from './components/read-all/read-all.component';

const routes: Routes = [
  {
    path: '',
    component: ReadAllComponent
  },
  {
    path: 'finished',
    component: FinalizadosComponent
  },
  {
    path: 'create',
    component: CreateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
