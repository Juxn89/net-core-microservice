import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { CurrencyPipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { BookDialog } from './book.dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  imports: [
    MatTableModule,
    MatSortModule,
    CurrencyPipe,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
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
    // this.books = this.bookService.getBooks()
    this.booksDataSource.data = this.bookService.getBooks()
    this.booksSubcription = this.bookService.bookSubject.subscribe( () => {
      this.booksDataSource.data = this.bookService.getBooks()
    })
  }

  filter(event: KeyboardEvent) {
    const currentValue = event.key
    this.booksDataSource.filter = currentValue
  }

  addBookDialog() {
    const dialogRef = this.dialog.open(BookDialog, { width: '350px' })
  }
}
