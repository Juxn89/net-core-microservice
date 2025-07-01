import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Author } from "./author.model";
import { environment } from '../../environments/environment'
import { Subject } from "rxjs";
import { catchError, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthorService {

  baseUrl: string = environment.baseUrl
  private authors: Author[] = []
  private httpClient = inject(HttpClient)
  private authorsSuject = new Subject<Author[]>()

  getAuthors() {
    this.httpClient.get<Author[]>(`${this.baseUrl}api/Authors`)
      .pipe(
        catchError(error => {
          return of([]);
        })
      )
      .subscribe(authors => {
        this.authors = authors
        this.authorsSuject.next([...this.authors])
      })
  }

  getCurrentListener() {
    return this.authorsSuject.asObservable()
  }
}
