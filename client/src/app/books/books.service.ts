import { Injectable } from "@angular/core";
import { Books } from "./books.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BooksService {
  bookSubject = new Subject<Books>()
  private books: Books[]  = [
    {bookId: 1, title: 'The Shadow of the Wind', description: 'A gripping tale of books, mystery, and love in post-war Barcelona.', price: 19.99, publishDate: new Date('2001-06-06'), author: 'Carlos Ruiz Zafón'},
    {bookId: 2, title: 'One Hundred Years of Solitude', description: 'The Buendía family saga in the mythical town of Macondo.', price: 14.5, publishDate: new Date('1967-05-30'), author: 'Gabriel García Márquez'},
    {bookId: 3, title: 'The Little Prince', description: 'A poetic and philosophical journey through interplanetary adventures.', price: 9.99, author: 'Antoine de Saint-Exupéry'},
    {bookId: 4, title: 'Pedro Páramo', description: 'A surreal dive into Mexican magical realism.', price: 11.75, publishDate: new Date('1955-03-19'), author: 'Juan Rulfo'},
    {bookId: 5, title: 'Brave New World', description: 'A dystopian vision of a futuristic society driven by control and pleasure.', price: 12.99, publishDate: new Date('1932-08-31'), author: 'Aldous Huxley'},
    {bookId: 6, title: '1984', description: 'A chilling portrayal of totalitarianism and surveillance.', price: 13.49, publishDate: new Date('1949-06-08'), author: 'George Orwell'},
    {bookId: 7, title: 'Ficciones', description: 'A labyrinth of metaphysical stories from the master of Argentine literature.', price: 15.2, publishDate: new Date('1944-01-01'), author: 'Jorge Luis Borges'},
    {bookId: 8, title: 'Crime and Punishment', description: 'A psychological dive into guilt and morality in 19th-century Russia.', price: 17.89, publishDate: new Date('1866-01-01'), author: 'Fyodor Dostoevsky'},
    {bookId: 9, title: 'Like Water for Chocolate', description: 'A romantic tale infused with Mexican culture and magical realism.', price: 10.99, publishDate: new Date('1989-09-01'), author: 'Laura Esquivel'},
    {bookId: 10, title: 'The Name of the Rose', description: 'A medieval mystery rich with semiotics and suspense.', price: 16.75, publishDate: new Date('1980-11-01'), author: 'Umberto Eco'},
    {bookId: 11, title: 'Don Quixote', description: 'The timeless adventures of a nobleman lost in chivalric delusions.', price: 18.95, publishDate: new Date('1605-01-16'), author: 'Miguel de Cervantes'},
    {bookId: 12, title: 'To Kill a Mockingbird', description: 'A stirring story of justice and morality in the racially tense American South.', price: 14.25, publishDate: new Date('1960-07-11'), author: 'Harper Lee'},
    {bookId: 13, title: 'Siddhartha', description: 'A spiritual journey of self-discovery inspired by Eastern philosophy.', price: 9.5, publishDate: new Date('1922-01-01'), author: 'Hermann Hesse'},
    {bookId: 14, title: 'The Alchemist', description: 'A philosophical parable about pursuing one’s destiny.', price: 12.3, publishDate: new Date('1988-04-15'), author: 'Paulo Coelho'},
    {bookId: 15, title: 'The House of the Spirits', description: 'A family saga interwoven with Chilean history and magical realism.', price: 13.85, publishDate: new Date('1982-01-01'), author: 'Isabel Allende'}
  ]

  getBooks(): Books[] {
    return [ ...this.books ]
  }

  saveBook(newBook: Books){
    this.books.push(newBook)
    this.bookSubject.next(newBook)
  }
}
