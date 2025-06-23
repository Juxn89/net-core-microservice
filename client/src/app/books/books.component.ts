import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { CurrencyPipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-books',
  imports: [
    MatTableModule,
    MatSortModule,
    CurrencyPipe,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit, AfterViewInit {

  books: Books[] = []
  booksDataSource = new MatTableDataSource()
  columns:string[] = [ 'title', 'description', 'price', 'author' ]
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private bookService: BooksService
  ){}

  ngAfterViewInit(): void {
    this.booksDataSource.sort = this.sort;
    this.booksDataSource.paginator = this .paginator
  }

  ngOnInit(): void {
    // this.books = this.bookService.getBooks()
    this.booksDataSource.data = this.bookService.getBooks()
  }

  filter(event: KeyboardEvent) {
    const currentValue = event.key
    this.booksDataSource.filter = currentValue
  }
}
