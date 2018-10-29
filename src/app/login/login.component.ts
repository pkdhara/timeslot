import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = "";
  user: string;
  login = {};
  loggedInUser = {};
  errorMessage = "";
  constructor(private router: Router,
    private service: AppService,
    private authService : AuthService) {
      authService.getCurrentUser()
      .subscribe(user => this.loggedInUser = user);
      if(this.loggedInUser['role'] != undefined ){
        alert("You are already logged in..");
        this.router.navigate(['/']);
      }
      
  }
  ngOnInit() {
  }
  onForgotPassword() {
    let emailRegex = new RegExp("^[A-Za-z0-9._%+-]+@argusoft.(com|in)$");
    let email = prompt("Enter your email id");
    if (email == null || email == "") {
      this.status = "Invalid Email";
    }
    else if(!emailRegex.test(email)) {
      this.errorMessage = "Email is not in proper format (ex: abc@argusoft.com or .in )";
    }
    else {
      this.service.sendMail(email)
        .subscribe(
          (response) => {
            this.errorMessage = "";
            if (response.text() == "Message Send") {
              this.status = "Password send to " + email;
            }
            else {
              this.errorMessage = "No matched email Id found";
            }
          },
          (error) => {
            this.errorMessage = "Server Error";
          }
        );
    }
  }
  onSubmit() {
    this.service.userLogin(this.login)
      .subscribe(
        (response) => {
          let data = response.json();
          console.log(response);
          if (data.email == null) {
            this.errorMessage = "Invalid email or password";
          }
          else {
            this.loggedInUser = data;
            this.authService.setloginUser(this.loggedInUser);
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.errorMessage = "Can't Login now";
          console.log(error);
        }
      );
  }

}
