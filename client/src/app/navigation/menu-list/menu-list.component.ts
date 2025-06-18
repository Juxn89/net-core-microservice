import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import { SecurityService } from '../../security/security.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Output() sideNav = new EventEmitter()
  isLogged: Boolean = false
  userSubscription!: Subscription

  constructor(private securityService: SecurityService){ }

  ngOnInit() {
    this.userSubscription = this.securityService.isLogIn$.subscribe(status => {
      this.isLogged = status
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  onMenuCloseDispatch() {
    this.sideNav.emit()
  }

  SingOut() {
    this.onMenuCloseDispatch()
    this.securityService.clearSession()
  }
}
