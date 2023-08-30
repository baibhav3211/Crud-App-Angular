import { Component, OnInit, ViewChild } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: EmployeeService, private coreService: CoreService) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }


  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(BodyComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList(){
    this.service.getEmployeeList().subscribe({
      next: (val) => {
        // console.log(val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number){
    this.service.deleteEmployee(id).subscribe({
      next: (val) => {
        this.coreService.openSnackBar('Employee Deleted Successfully', 'Close');
        this.getEmployeeList();
      },
      error: console.log,
    })
  }

  openEditForm(data:any){
    const dialogRef = this.dialog.open(BodyComponent, {data})
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

}
