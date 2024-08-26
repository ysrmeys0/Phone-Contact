import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionCellRendererComponent } from '../action-cell-renderer/action-cell-renderer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
  ],
  imports: [
    HomeComponent,
    CommonModule,
    AgGridModule,
    ActionCellRendererComponent,
    TranslateModule,

  ],
  exports: [
  ]
})
export class HomeModule { }
