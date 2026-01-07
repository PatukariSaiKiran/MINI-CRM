import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    LoaderComponent,
    PaginationComponent,
    DeleteComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    PaginationComponent,
    DeleteComponent,
   
  ]
})
export class SharedModule { }
