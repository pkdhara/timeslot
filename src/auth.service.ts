import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: BehaviorSubject<{}>;
  constructor() {
    this.currentUser = new BehaviorSubject({});
   }
  setloginUser(user) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<{}> {
    return this.currentUser.asObservable();
}
}
