import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
/**
 * this component is a multi-purpose dynamically generated dumb data table that can be configured to show any list of data,
 * for more information on configuring the table
 * and the json structure for the inputs please check [Configuration File]{@link ../additional-documentation/config-file.html}
 * ![Screenshot-1](../screenshots/dynamicTable.png)
 *
 * ### related Links:
 * - [Pagination Component]{@link PaginationComponent}
 * - [Dynamic Table]{@link DynamicTableComponent}
 * - [Configuration File]{@link ../additional-documentation/config-file.html}
 *
 * @title
 * Data Table
 *
 * @example
 *
 * <cts-table
 *     [rows]="rows"
 *     [columns]="columns"
 *     [responsiveColumns]="responsiveColumns"
 *     [rowCursor]="rowCursor"
 *     [fullWidth]="fullWidth"
 *     [entityType]="entityType"
 *     [prefix]="prefix"
 *     [totalRecords]="totalRecords"
 *     [tableMode]="tableMode"
 *     [tableActions]="tableActions"
 *     (onRowSelected)="rowDetails($event)"
 *     (actionOnRow)="performAction($event)"
 *     (onSorting)="onSort($event)"
 *  ></cts-table>
 *
 */
@Component({
  selector: 'cts-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  /** event to emit when selecting single row */
  @Output() onRowSelected = new EventEmitter();
  /** event to emit when selecting single row Icon */
  @Output() onIconSelected = new EventEmitter();
  /** event to emit when perform action on row (delte, edit, ... ) */
  @Output() actionOnRow = new EventEmitter();
  /** event t emit when sorting table */
  @Output() onSorting = new EventEmitter();
  /** aray of rows passed from out side the component */
  @Input() rows: any;
  /** array of columns paased from out side the component */
  @Input() columns: any;
  /** array of columns paased from out side the component for smaller screens */
  @Input() responsiveColumns: any;



  @Input() defultSort = null;
  tableWidth = 'auto';
  tableColumns : any;
  currentRow: any;
  selected = [];
  pageNumber = 1;

  constructor() { }

  ngOnInit(): void {
    this.onResize(window.innerWidth);
  }

  // function to be executed when clicking on single row
  // rowDetails(event: { type: string; column: { prop: string; }; row: any; }) {
  //   if (event.type !== 'mouseenter') {
  //     if (event.type === 'click' && event.column.prop !== '') {
  //       this.currentRow = event.row;
  //       this.onRowSelected.emit(this.currentRow);
  //     }
  //   }
  // }
  iconSelected(event: MouseEvent, row: any) {
    event.stopPropagation();
    this.onIconSelected.emit(row);
  }

  //function to handle all operations on single row (delete , edit , ...)
  performAction(singleRow: any, actionType: any) {
    this.actionOnRow.emit({
      type: actionType,
      row: singleRow,
    });
  }

  // handle checkbox if table has ones
  onSelect(event: any) {
    // console.log('on select row click');
  }

  // handle sorting functionality of the table
  onSort(event: { column: { headerClass: any; }; newValue: any; }) {
    let sort = {
      sortBy: event.column.headerClass,
      sortOrder: event.newValue,
    };
    this.onSorting.emit(sort);
  }

  assignTableColumns(event: { target: { innerWidth: any; }; }) {
    this.onResize(event.target.innerWidth);
  }

  onResize(width: number) {
    if (width < 768) {
      this.tableColumns = [];
      this.tableColumns = this.responsiveColumns;
    } else {
      this.tableColumns = [];
      this.tableColumns = this.columns;
    }
  }
}
