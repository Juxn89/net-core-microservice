import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() sidenav = new EventEmitter()

  onMenuToggleDispatch() {
    this.sidenav.emit()
  }
}
