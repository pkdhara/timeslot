import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = "http://localhost:8082/EmployeeManagement/emp/";
  loginUrl = "http://localhost:8082/EmployeeManagement/login";
  constructor(private http : Http) { }

  getEmployees() {
    return this.http.get(this.url);
  }

  registerEmployees(employee : {}) {
   return this.http.post(this.url,employee);
  }
  deleteEmployee(employeeId) {
    return this.http.delete(this.url+employeeId);
  }
  updateEmployee(employee) {
    return this.http.put(this.url+employee.id,employee);
  }

  userLogin(loginDetails) {
    return this.http.post(this.loginUrl,loginDetails);
  }

  sendMail(email) {
    return this.http.get(this.loginUrl+"?email="+email);
  } 
}
