import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaBoardComponent } from './pages/tela-board/tela-board.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardHomeComponent } from './pages/board-home/board-home.component';
import { BoardModalComponent } from './shared/modais/board-modal/board-modal.component';
import { CardModalComponent } from './shared/modais/card-modal/card-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    TelaBoardComponent,
    BoardHomeComponent,
    BoardModalComponent,
    CardModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
