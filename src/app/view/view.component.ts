import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  employees = [{
    'id': 2018001,
    'name': "Pradeep",
    'dob': "30-12-1995",
    'address': "Vikash",
    'city': "Jamshedpur",
    'salary': 14021,
    'email': "pdhara@argusoft.in",
    'department': "Developer"
  }];
  loggedInUser = {};
  editRowId: any;
  dtmax: Date;
  constructor(private service: AppService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    auth.getCurrentUser()
      .subscribe(user => this.loggedInUser = user);
    if (this.loggedInUser['role'] == undefined) {
      this.router.navigate(['/logout'], { relativeTo: this.route });
    }
    let currentDate = new Date();
    this.dtmax = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.service.getEmployees()
      .subscribe(
        (response: Response) => {
          const data = response.json();
          this.employees = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteRow(id) {
    this.service.deleteEmployee(id)
      .subscribe(
        (response) => {
          alert("Employee removed");
          this.getAllEmployees();
        }
        , (error) => {
          alert("Server Error : Can't Remove Employee");
          console.log(error);
        }
      );
  }

  updateRow(emp) {
    this.service.updateEmployee(emp)
      .subscribe(
        (response) => {
          alert("Employee Updated");
        },
        (error) => {
          alert("Server Error : Can't Update Employee");
          console.log(error);
        }
      );
  }

}
