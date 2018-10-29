import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loggedInUser : {};
  message = "";
  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      auth.getCurrentUser()
      .subscribe(user => this.loggedInUser = user);
      if ( this.loggedInUser['role'] == undefined) {
        alert("You are not logged in");
        this.router.navigate(['/'], { relativeTo: this.route });
      }
      this.message = "Logout Succesful";
      this.auth.setloginUser({});
    }

  ngOnInit() {
  }

}
