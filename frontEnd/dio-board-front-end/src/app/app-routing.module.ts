import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaBoardComponent } from './pages/tela-board/tela-board.component';
import { BoardHomeComponent } from './pages/board-home/board-home.component';

const routes: Routes = [
  {
    path: 'home', component: BoardHomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
