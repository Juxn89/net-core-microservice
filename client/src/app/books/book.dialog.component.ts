import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Form, FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogClose, MatDialogActions, MatDialogTitle, MatDialogContent, MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOption, MatSelectChange, MatSelectModule } from '@angular/material/select'
import { BooksService } from "./books.service";
import { AuthorService } from "../authors/author.service";
import { Author } from "../authors/author.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-book-dialog',
  templateUrl: 'book.dialog.compoent.html',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDialog implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialog,
    private booksService: BooksService,
    private authorService: AuthorService
  ){}

  selectedAuthor: string = ''
  selectedAuthorId: string = ''
  selectedAuthorName: string = ''
  publishDate: string = ''
  authors: Author[] = []

  authorSubcription!: Subscription

  ngOnInit(): void {
    this.authorService.getAuthors()
    this.authorSubcription = this.authorService.getCurrentListener()
      .subscribe(authors => {
        this.authors = authors
      })
  }

  ngOnDestroy(): void {
    this.authorSubcription.unsubscribe()
  }

  SaveBook(dialogForm: NgForm) {
    if(!dialogForm.valid)
      return

    const { title, description, price } = dialogForm.value

    this.booksService.saveBook({
      bookId: 100,
      title,
      description,
      price,
      author: this.selectedAuthorId,
      publishDate: new Date(this.publishDate)
    })

    this.dialogRef.closeAll()
  }

  selectAuthor(event: MatSelectChange<any>){
    this.selectedAuthorId = (event.source.selected as MatOption).value
    this.selectedAuthorName = (event.source.selected as MatOption).viewValue
  }
}
