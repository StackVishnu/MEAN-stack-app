import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [
  ]
})
export class EmployeesComponent implements OnInit{
constructor(public service:EmployeeService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.service.fetchEmployeeList();
  }
populateForm(selectedRecord:Employee){
  this.service.employeeForm.setValue({
    _id: selectedRecord._id,
    fullName: selectedRecord.fullName,
    location: selectedRecord.location,
    position: selectedRecord.position,
    salary: selectedRecord.salary
  })
}
onDelete(_id:string){
  if(confirm('Are you sure ?')){
    this.service.deleteEmployee(_id).subscribe(res=>{
      this.service.fetchEmployeeList()
      this.toastr.info('Deleted Successfully',"Employee Register")
    })
  }
}
}
