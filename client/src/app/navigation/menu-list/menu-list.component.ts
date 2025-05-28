import { Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {
  @Output() sideNav = new EventEmitter()

  onMenuCloseDispatch() {
    this.sideNav.emit()
  }
}
