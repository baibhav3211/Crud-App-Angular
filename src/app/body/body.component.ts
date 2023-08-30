import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  empForm : FormGroup;

  education: string[] = ['B.Tech', 'M.Tech', 'MCA', 'MBA'];

  constructor(private fb:FormBuilder, 
      private service: EmployeeService, 
      private dialogRef: MatDialogRef<BodyComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private coreService: CoreService
      ) { 
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      // console.log(this.empForm.value);
      if(this.data){
        this.service.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val) => {
            this.coreService.openSnackBar('Employee Updated Successfully', 'Close');
            this.dialogRef.close(true);
          },
          error: (err) => {
              console.error(err);
          }
        })
      }else{
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val) => {
            this.coreService.openSnackBar('Employee Added Successfully', 'Close');
            this.dialogRef.close(true);
          },
          error: (err) => {
              console.error(err);
          }
        })
      }
      
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

} 
