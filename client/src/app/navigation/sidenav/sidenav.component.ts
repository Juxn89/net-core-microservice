import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() sidenav = new EventEmitter()

  isUserLogged: boolean = false

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
    this.securityService.isLogIn$.subscribe(isLoggedIn => {
      this.isUserLogged = isLoggedIn
      console.log(isLoggedIn)
    });
  }

  ngOnDestroy() {
  }

  onMenuToggleDispatch() {
    this.sidenav.emit()
  }
}
