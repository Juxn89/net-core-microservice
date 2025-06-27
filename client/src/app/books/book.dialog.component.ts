import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Form, FormsModule, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogClose, MatDialogActions, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOption, MatSelectChange, MatSelectModule } from '@angular/material/select'
import { BooksService } from "./books.service";

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
export class BookDialog{
  constructor(
    private booksService: BooksService
  ){}

  selectedAuthor: string = ''
  selectedAuthorName: string = ''
  publishDate: string = ''

  SaveBook(dialogForm: NgForm){
    const { title, description, price } = dialogForm.value

    this.booksService.saveBook({
      bookId: 100,
      title,
      description,
      price,
      author: this.selectedAuthorName,
      publishDate: new Date(this.publishDate)
    })
  }

  selectAuthor(event: MatSelectChange<any>){
    this.selectedAuthorName = (event.source.selected as MatOption).viewValue
  }
}
