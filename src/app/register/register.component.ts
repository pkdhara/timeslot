import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loggedInUser = {};
  @ViewChild('empForm') registerForm: NgForm;
  passWarning = "";
  confirmPassWarning="";
  confirmPassFlag= true;
  dtmax : Date; 
  constructor(private service : AppService,
    private auth:AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      auth.getCurrentUser()
      .subscribe(user => this.loggedInUser = user);
      if(this.loggedInUser['role'] === 'ROLE_USER' || this.loggedInUser['role'] == undefined) {
        this.router.navigate(['/logout'], { relativeTo: this.route });
      } 
   let currentDate = new Date();
   this.dtmax = new Date(currentDate.getFullYear()-18,currentDate.getMonth(),currentDate.getDate());
  }

  ngOnInit() {
  }
  checkPassword(event: Event) {
    let password = (<HTMLInputElement>event.target).value;
    let strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (password.length == 0) {
      this.registerForm.control.markAsDirty();
      this.passWarning = "";
    }
    else if (password.length < 8) {

      this.passWarning = "Password is too short";
      this.registerForm.control.markAsDirty();
    }
    else {
      if (strongPassword.test(password)) {
        this.passWarning = "";
      } else {
        this.passWarning = "a capital, a small and a special character required";
        this.registerForm.control.markAsDirty();
      }
    }
  }

  checkConfirmPassword(event :Event) {
    let confirmPassword = (<HTMLInputElement>event.target).value;
    if(this.registerForm.value.password != confirmPassword) {
      this.confirmPassWarning ="Password not matched";
    }
    else {
      this.confirmPassFlag = false;
      this.confirmPassWarning ="";
    }
  }

  onSubmit() {
    this.service.registerEmployees(this.registerForm.value)
    .subscribe(
      (response) => {
        alert("Employee registerted succesfully");
        this.registerForm.reset();
      }
      ,(error) => {
        alert("Server Error : Can't register employee");
        console.log(error);
      }
    );
  }
}
