import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { HomeComponent } from './home/home.component';
import { SecurityRouter } from './navigation/menu-list/security.router';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ SecurityRouter ] },
  { path: 'book', component: BookComponent },
  { path: 'books', component: BooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
