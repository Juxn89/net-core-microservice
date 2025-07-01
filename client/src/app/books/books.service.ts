import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Books } from "./books.model";
import { Pagination } from "./pagination.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BooksService {

  baseUrl: string = environment.baseUrl
  private books: Books[]  = []
  private httpClient = inject(HttpClient)
  bookSubject = new Subject<Books>()
  bookPagination!: Pagination<Books>
  bookPaginationSubject = new Subject<Pagination<Books>>()

  getBooks(booksPerPage: number, currentPage: number, sort: string, sortDirection: number, filterValue: any) {
    const request = {
      pageSize: booksPerPage,
      page: currentPage,
      sort,
      sortDirection,
      filterValue
    }

    this.httpClient.post<Pagination<Books>>(`${this.baseUrl}api/books/pagination`, request)
      .subscribe(books => {
        this.bookPagination = books
        this.bookPaginationSubject.next({...books})
      })
  }

  getCurrentListener() {
    return this.bookPaginationSubject.asObservable()
  }

  saveBook(newBook: Books){
    this.books.push(newBook)
    this.bookSubject.next(newBook)
  }
}
