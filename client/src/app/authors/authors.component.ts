import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthorService } from './author.service';
import { Author } from './author.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors',
  imports: [
    MatTableModule
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit, OnDestroy {

  authorsDataSource = new MatTableDataSource<Author>()
  columns: string[] = [ 'name', 'lastName', 'academicDegree' ]
  private authorsSubcription!: Subscription;


  constructor(
    private authorsService: AuthorService
  ){}

  ngOnInit(): void {
    // Inicializar con array vacío
    this.authorsDataSource.data = [];
    
    // Subscribirse primero al listener
    this.authorsSubcription = this.authorsService.getCurrentListener()
      .subscribe(authors => {
        this.authorsDataSource.data = authors
      })
    
    // Luego hacer la petición
    this.authorsService.getAuthors()
  }

  ngOnDestroy(): void {
    this.authorsSubcription.unsubscribe()
  }
}
