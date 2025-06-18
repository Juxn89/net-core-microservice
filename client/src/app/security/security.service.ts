import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Subject } from 'rxjs';

import { User } from "./user.model";
import { LoginData } from "./login-data.model";

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private user!: User;
  private isLogIn = new Subject<boolean>();

  isLogIn$ = this.isLogIn.asObservable()

  constructor(private router: Router){}

  register(newUser: User) {
    this.user = {
      ...newUser,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.isLogIn.next(true)

    this.router.navigate(['/'])
  }

  login(loginData: LoginData) {
    this.user = {
      ...this.user,
      email: loginData.email,
      password: loginData.password,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.isLogIn.next(true)

    this.router.navigate(['/'])
  }

  clearSession() {
    this.user = null!;
    this.isLogIn.next(false);
    this.router.navigate(['/login'])
  }

  GetUser() {
    return { ...this.user};
  }

  isUserOnSession() {
    return this.user != null
  }
}
