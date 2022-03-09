import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableComponent } from './table/table.component';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * @title
 * Table Module
 */
@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatTooltipModule
  ],
  exports:[
    TableComponent,
    NgxDatatableModule
  ]
})
export class TableModule { }
