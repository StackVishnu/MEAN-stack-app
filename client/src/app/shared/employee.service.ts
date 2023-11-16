
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';
import { Employee } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURL = 'http://localhost:3000/api/employees/';
  list:Employee[] = [];

  employeeForm = this.fb.group({
    _id: [''],
    fullName : ['',Validators.required],
    position : ['',Validators.required],
    location : [''], 
    salary   : ['',Validators.required]
  })

  fetchEmployeeList(){
    this.http.get(this.BaseURL)
    .pipe(catchError(this.errorHandler))
    .subscribe(data=>{
      this.list = data as Employee[];
      console.log(data);
    })
  }

  postEmployee(){
    return this.http.post(this.BaseURL,this.employeeForm.value)
    .pipe(catchError(this.errorHandler))
  }

  putEmployee(){
    return this.http.put(this.BaseURL+this.employeeForm.get('_id')?.value,this.employeeForm.value)
    .pipe(catchError(this.errorHandler))
  }
  deleteEmployee(_id :string){
    return this.http.delete(this.BaseURL+ _id)
    .pipe(catchError(this.errorHandler))
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
