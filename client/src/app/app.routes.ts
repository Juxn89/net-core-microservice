import { Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SecurityRouter } from './navigation/menu-list/security.router';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ SecurityRouter ] },
  { path: 'authors', component: AuthorsComponent, canActivate: [ SecurityRouter ] },
  { path: 'book', component: BookComponent, canActivate: [ SecurityRouter ] },
  { path: 'books', component: BooksComponent, canActivate: [ SecurityRouter ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
