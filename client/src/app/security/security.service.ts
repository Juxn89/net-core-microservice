import { Subject } from 'rxjs';
import { Router } from '@angular/router'
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { LoginData } from "./login-data.model";
import { HttpClient } from '@angular/common/http';
import { User, UserRegister } from "./user.model";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  baseURL = environment.baseUrl;
  private httpClient = inject(HttpClient)
  private platformId = inject(PLATFORM_ID);

  private user!: User;
  private token!: string;
  private isLogIn = new Subject<boolean>();

  isLogIn$ = this.isLogIn.asObservable()

  constructor(
    private router: Router
  ){
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
        this.isLogIn.next(true);
      }
    }
  }

  register(newUser: UserRegister) {
    this.user = {
      ...newUser,
      token: '',
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.isLogIn.next(true)

    this.router.navigate(['/'])
  }

  login(loginData: LoginData) {
    this.httpClient.post<User>(`${this.baseURL}user/login`, loginData)
      .subscribe(response => {
        this.token = response.token;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
        }

        this.user = {
          ...response,
          password: ''
        }

        this.isLogIn.next(true)
        this.router.navigate(['/'])
      })
  }

  clearSession() {
    this.user = null!;
    this.token = '';

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }

    this.isLogIn.next(false);
    this.router.navigate(['/login'])
  }

  GetUser() {
    return { ...this.user};
  }

  isUserOnSession() {
    return this.user != null
  }

  getToken(): string {
    if (!this.token && isPlatformBrowser(this.platformId)) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
      }
    }
    return this.token || '';
  }
}
