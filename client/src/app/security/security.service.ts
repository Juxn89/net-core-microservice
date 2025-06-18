import { Subject, Subscription } from 'rxjs';

import { User } from "./user.model";
import { LoginData } from "./login-data.model";
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private user!: User;
  private isLogIn = new Subject<boolean>();

  isLogIn$ = this.isLogIn.asObservable()

  register(newUser: User) {
    this.user = {
      ...newUser,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.isLogIn.next(true)
  }

  login(loginData: LoginData) {
    this.user = {
      ...this.user,
      email: loginData.email,
      password: loginData.password,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.isLogIn.next(true)
  }

  clearSession() {
    this.user = null!;

    this.isLogIn.next(false);
  }

  GetUser() {
    return { ...this.user};
  }
}
