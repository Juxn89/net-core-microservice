import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';

import { Books } from './books.model';
import { BooksService } from './books.service';
import { KeyboardKey, SortDirecction } from '../const/enums'
import { Pagination } from './pagination.model';
import { BookDialog } from './book.dialog.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { debounce } from './js.helpers';

@Component({
  selector: 'app-books',
  imports: [
    CurrencyPipe,
    FlexModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {

  books: Books[] = []
  booksDataSource = new MatTableDataSource()
  columns:string[] = [ 'title', 'description', 'price', 'author' ]
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  readonly dialog = inject(MatDialog)

  private booksSubcription!: Subscription

  totalBooks = 0
  booksPerPage = 5
  booksPerPageOptions = [1, 2, 5, 10]
  currentPage = 1
  sortField = 'title'
  sortDirection = SortDirecction.ASC
  filterValue: any = null

  constructor(
    private bookService: BooksService
  ){}

  ngOnDestroy(): void {
    this.booksSubcription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.booksDataSource.sort = this.sort;
    this.booksDataSource.paginator = this .paginator
  }

  ngOnInit(): void {
    this.loadBooksData()

    this.booksSubcription = this.bookService
      .getCurrentListener()
      .subscribe((books: Pagination<Books>) => {
        this.booksDataSource = new MatTableDataSource()
        this.booksDataSource.data = books.data

        this.totalBooks = books.totalRecords
      })
  }

  filter(event: KeyboardEvent) {
    debounce( () => {
      const currentValue = event.key
      const requestBody = {
        key: 'title',
        value: currentValue
      }

      this.filterValue = { ...requestBody }
      this.loadBooksData()
    })
  }

  paginatorEvent(event: PageEvent) {
    this.booksPerPage = event.pageSize
    this.currentPage = event.pageIndex + 1

    this.bookService.getBooks(
      this.booksPerPage,
      this.currentPage,
      this.sortField,
      this.sortDirection,
      this.filterValue)
  }

  addBookDialog() {
    const dialogRef = this.dialog.open(BookDialog, { width: '350px' })

    dialogRef.afterClosed()
      .subscribe(() => {
        this.loadBooksData()
      })
  }

  private loadBooksData() {
    this.bookService.getBooks(
      this.booksPerPage,
      this.currentPage,
      this.sortField,
      this.sortDirection,
      this.filterValue)
  }

  sortColumn(event: Sort) {
    this.sortField = event.active
    this.sortDirection = event.direction === 'asc' ? SortDirecction.ASC : SortDirecction.DESC
    this.loadBooksData()
  }
}
